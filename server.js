const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const SITE_DIR = path.join(__dirname, "site");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function serveFile(req, res, targetPath) {
  const safePath = path.normalize(targetPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(SITE_DIR, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(SITE_DIR)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(res, 404, { error: "Not found" });
        return;
      }
      sendJson(res, 500, { error: "Failed to read file" });
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-store" : "public, max-age=300",
    });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendViaResend({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev";

  if (!apiKey || !to) {
    return {
      ok: true,
      mock: true,
      message: "Email delivery is mocked. Set RESEND_API_KEY and CONTACT_TO_EMAIL to enable sending.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `[NAM YUL Portfolio] ${name} sent a message`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend request failed: ${details}`);
  }

  return { ok: true, mock: false, message: "Email sent successfully." };
}

function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "POST" && url.pathname === "/api/contact") {
      try {
        const rawBody = await readBody(req);
        const payload = JSON.parse(rawBody || "{}");
        const name = String(payload.name || "").trim();
        const email = String(payload.email || "").trim();
        const message = String(payload.message || "").trim();

        if (!name || !email || !message) {
          sendJson(res, 400, { error: "All fields are required." });
          return;
        }

        if (!isValidEmail(email)) {
          sendJson(res, 400, { error: "Please enter a valid email address." });
          return;
        }

        if (message.length < 10) {
          sendJson(res, 400, { error: "Message must be at least 10 characters long." });
          return;
        }

        const result = await sendViaResend({ name, email, message });
        sendJson(res, 200, result);
        return;
      } catch (error) {
        sendJson(res, 500, {
          error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
          details: error.message,
        });
        return;
      }
    }

    if (req.method === "GET") {
      const target = url.pathname === "/" ? "/index.html" : url.pathname;
      serveFile(req, res, target);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`Portfolio server running on http://${HOST}:${PORT}`);
  });
}

module.exports = {
  createServer,
  isValidEmail,
};
