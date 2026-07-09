const projects = [
  {
    title: "Winter Rehearsal",
    year: "2026",
    director: "Lee Seongho",
    role: "Joon",
    description:
      "A restrained feature drama about memory, distance, and the small gestures that reveal what a character cannot say aloud.",
    palette: ["#2a2623", "#8a775e"],
  },
  {
    title: "Night Practice",
    year: "2025",
    director: "Park Hyejin",
    role: "Minjae",
    description:
      "A coming-of-age short shaped around late-night conversations, rehearsal rooms, and the emotional afterimage of ambition.",
    palette: ["#181f28", "#6c8399"],
  },
  {
    title: "Borrowed Summer",
    year: "2024",
    director: "Choi Yerin",
    role: "Hyun",
    description:
      "An intimate independent film where silence, rhythm, and close framing drive the performance more than exposition.",
    palette: ["#2c221f", "#a77f65"],
  },
];

const photos = [
  { title: "Portrait 01", palette: ["#232323", "#8d7258"] },
  { title: "Portrait 02", palette: ["#151d24", "#67809a"] },
  { title: "Still 01", palette: ["#241d1a", "#af8d6a"] },
  { title: "Still 02", palette: ["#1b1c20", "#7c7f88"] },
  { title: "Mood 01", palette: ["#1a1716", "#8e6950"] },
  { title: "Mood 02", palette: ["#191d22", "#8294a9"] },
  { title: "Profile 01", palette: ["#24211e", "#c0a07b"] },
  { title: "Profile 02", palette: ["#16181d", "#6e7f90"] },
];

function createPlaceholder(label, [start, end], ratio = "4:5") {
  const [width, height] = ratio.split(":").map(Number);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width * 400} ${height * 400}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      <circle cx="${width * 320}" cy="${height * 120}" r="${width * 90}" fill="rgba(255,255,255,0.08)" />
      <circle cx="${width * 90}" cy="${height * 320}" r="${width * 120}" fill="rgba(0,0,0,0.14)" />
      <text
        x="50%"
        y="82%"
        fill="rgba(255,255,255,0.82)"
        font-family="Georgia, serif"
        font-size="48"
        text-anchor="middle"
        letter-spacing="6"
      >${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderProjects() {
  const list = document.getElementById("act-list");

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "act-card";
    card.innerHTML = `
      <div class="act-visual">
        <img
          src="${createPlaceholder(project.title, project.palette, "16:10")}"
          alt="${project.title} representative still"
          loading="lazy"
        />
      </div>
      <div class="act-meta">
        <div class="act-title-row">
          <h3>${project.title}</h3>
          <span class="act-year">${project.year}</span>
        </div>
        <div class="act-facts">
          <div>
            <span class="fact-label">Director</span>
            <span>${project.director}</span>
          </div>
          <div>
            <span class="fact-label">Role</span>
            <span>${project.role}</span>
          </div>
        </div>
        <p class="act-description">${project.description}</p>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderPhotos() {
  const grid = document.getElementById("photo-grid");

  photos.forEach((photo, index) => {
    const item = document.createElement("article");
    item.className = "photo-card";
    const src = createPlaceholder(photo.title, photo.palette);
    item.innerHTML = `
      <button type="button" class="photo-button" data-photo-index="${index}" aria-label="Open ${photo.title}">
        <img src="${src}" alt="${photo.title}" loading="lazy" />
        <p class="photo-caption">${photo.title}</p>
      </button>
    `;
    grid.appendChild(item);
    photo.src = src;
  });
}

function setupActiveNav() {
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupContactModal() {
  const modal = document.getElementById("contact-modal");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const openers = document.querySelectorAll("[data-open-contact]");
  const closers = document.querySelectorAll("[data-close-contact]");

  function openModal() {
    document.body.classList.add("modal-open");
    modal.showModal();
  }

  function closeModal() {
    modal.close();
    document.body.classList.remove("modal-open");
  }

  openers.forEach((button) => button.addEventListener("click", openModal));
  closers.forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => {
    const rect = form.getBoundingClientRect();
    const inside =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (!inside) closeModal();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.name || !payload.email || !payload.message) {
      status.textContent = "모든 항목을 입력해주세요.";
      status.className = "form-status is-error";
      return;
    }

    status.textContent = "Sending...";
    status.className = "form-status";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      status.textContent = data.mock
        ? "Thank you. 메일 전송 환경변수가 아직 없어 현재는 목업 응답으로 동작했습니다."
        : "Thank you. 메일이 성공적으로 전송되었습니다.";
      status.className = "form-status is-success";
      form.reset();
    } catch (error) {
      status.textContent = error.message || "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
      status.className = "form-status is-error";
    }
  });
}

function setupLightbox() {
  const modal = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-caption");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-nav.prev");
  const nextButton = document.querySelector(".lightbox-nav.next");
  let currentIndex = 0;
  let touchStartX = 0;

  function render(index) {
    currentIndex = (index + photos.length) % photos.length;
    image.src = photos[currentIndex].src;
    image.alt = photos[currentIndex].title;
    caption.textContent = photos[currentIndex].title;
  }

  function open(index) {
    render(index);
    document.body.classList.add("modal-open");
    modal.showModal();
  }

  function close() {
    modal.close();
    document.body.classList.remove("modal-open");
  }

  document.getElementById("photo-grid").addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-photo-index]");
    if (!trigger) return;
    open(Number(trigger.dataset.photoIndex));
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => render(currentIndex - 1));
  nextButton.addEventListener("click", () => render(currentIndex + 1));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  modal.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  });

  modal.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    render(currentIndex + (delta < 0 ? 1 : -1));
  });

  window.addEventListener("keydown", (event) => {
    if (!modal.open) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") render(currentIndex - 1);
    if (event.key === "ArrowRight") render(currentIndex + 1);
  });
}

renderProjects();
renderPhotos();
setupActiveNav();
setupContactModal();
setupLightbox();
