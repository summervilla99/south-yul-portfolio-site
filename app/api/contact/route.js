import { Resend } from "resend";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim();
    const message = String(payload?.message || "").trim();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return Response.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev";

    if (!apiKey || !to) {
      return Response.json({
        ok: true,
        mock: true,
        message:
          "Email delivery is mocked. Set RESEND_API_KEY and CONTACT_TO_EMAIL to enable sending.",
      });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[NAM YUL Portfolio] ${name} sent a message`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return Response.json({ ok: true, mock: false, message: "Email sent successfully." });
  } catch (error) {
    return Response.json(
      {
        error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
