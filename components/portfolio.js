import { PhotoGallery } from "./photo-gallery";
import { photoSections } from "../lib/portfolio-data";
import { getResolvedPhotoSections } from "../lib/cloudinary";
import { placeholderSvg } from "../lib/placeholder-svg";
import { PersonalInfoCard } from "./personal-info-card";
import { WorkSectionClient } from "./work-section-client";

export function Header({ copy, locale, setLocale }) {
  return (
    <header className="site-header">
      <a className="site-mark" href="#landing" aria-label="Go to landing">
        NAM YUL
      </a>
      <nav className="site-nav" aria-label="Primary">
        <a href="#act">{copy.nav.portfolio}</a>
        <a href="#photos">{copy.nav.photos}</a>
        <button type="button" data-open-contact>
          {copy.nav.contact}
        </button>
        <div className="locale-switch" aria-label="Language switch">
          <button
            type="button"
            className={locale === "en" ? "is-active" : ""}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
          <span>/</span>
          <button
            type="button"
            className={locale === "ko" ? "is-active" : ""}
            onClick={() => setLocale("ko")}
          >
            KR
          </button>
        </div>
      </nav>
    </header>
  );
}

export function HeroSection({ profileSummary, personalInfoCopy }) {
  return (
    <section className="hero hero-editorial" id="landing" aria-label="Landing hero">
      <div className="hero-media">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={placeholderSvg({
            label: "Hero Reel Placeholder",
            colors: ["#151515", "#4b3a29"],
            ratio: [16, 9],
          })}
        >
          <source src="/video/landing-reel.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-editorial-layout">
        <div className="hero-copy" aria-hidden="true" />

        <PersonalInfoCard profileSummary={profileSummary} copy={personalInfoCopy} />
      </div>
    </section>
  );
}

export function WorkSection({ copy, sections }) {
  return (
    <section className="section portfolio-section" id="act" aria-labelledby="act-title">
      <div className="section-heading">
        <p className="section-kicker">{copy.sections.workKicker}</p>
        <h2 id="act-title">{copy.sections.workTitle}</h2>
      </div>

      <div className="portfolio-intro">
        <div className="portfolio-lead">
          <p className="portfolio-lead-copy">{copy.intro}</p>
        </div>
      </div>
      <WorkSectionClient sections={sections} />
    </section>
  );
}

export function PhotosSection({ copy, sections }) {
  return (
    <section className="section photos-section" id="photos" aria-labelledby="photos-title">
      <div className="section-heading">
        <p className="section-kicker">{copy.sections.photosKicker}</p>
        <h2 id="photos-title">{copy.sections.photosTitle}</h2>
      </div>
      <PhotoGallery sections={sections} />
    </section>
  );
}

export async function getPhotoSectionsAndHero() {
  const sections = await getResolvedPhotoSections();
  return { sections: sections.length > 0 ? sections : photoSections };
}

export function Footer({ socials }) {
  return (
    <footer className="site-footer">
      <p>© 2026 NAM YUL</p>
        <div className="footer-links">
          {socials.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </footer>
  );
}

export function ContactModal({ copy }) {
  return (
    <dialog className="contact-modal" id="contact-modal" aria-labelledby="contact-title">
      <div className="contact-card">
        <div className="contact-header">
          <div>
            <p className="section-kicker">{copy.kicker}</p>
            <h2 id="contact-title">{copy.title}</h2>
          </div>
          <button
            type="button"
            className="close-button"
            aria-label="Close contact modal"
            data-close-contact
          >
            ×
          </button>
        </div>
        <p className="contact-copy">{copy.body}</p>
        <div className="contact-actions-grid">
          <a
            className="contact-channel"
            href="https://www.instagram.com/south_yul/"
            target="_blank"
            rel="noreferrer"
          >
            <span>{copy.instaLabel}</span>
            <strong>{copy.instaNote}</strong>
          </a>
          <a className="contact-channel" href="mailto:south_yul@kakao.com">
            <span>{copy.emailLabel}</span>
            <strong>{copy.emailNote}</strong>
          </a>
        </div>
        <div className="modal-actions">
          <button type="button" className="ghost-button" data-close-contact>
            {copy.close}
          </button>
        </div>
      </div>
    </dialog>
  );
}
