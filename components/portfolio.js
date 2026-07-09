import { PhotoGallery } from "./photo-gallery";
import {
  portfolioSections,
  profileSummary,
  socials,
} from "../lib/portfolio-data";
import { getResolvedPhotoSections } from "../lib/cloudinary";
import { placeholderSvg } from "../lib/placeholder-svg";
import { PersonalInfoCard } from "./personal-info-card";
import { WorkSectionClient } from "./work-section-client";

export function Header() {
  return (
    <header className="site-header">
      <a className="site-mark" href="#landing" aria-label="Go to landing">
        NAM YUL
      </a>
      <nav className="site-nav" aria-label="Primary">
        <a href="#act">PORTFOLIO</a>
        <a href="#photos">PHOTOS</a>
        <button type="button" data-open-contact>
          CONTACT
        </button>
      </nav>
    </header>
  );
}

export function HeroSection() {
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

        <PersonalInfoCard profileSummary={profileSummary} />
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section className="section portfolio-section" id="act" aria-labelledby="act-title">
      <div className="section-heading">
        <p className="section-kicker">Filmography & Stage</p>
        <h2 id="act-title">PORTFOLIO</h2>
      </div>

      <div className="portfolio-intro">
        <div className="portfolio-lead">
          <p className="portfolio-lead-copy">
            안녕하세요, 배우 남율입니다.
            <br />
            이야기를 사랑하는 마음으로 배우 활동을 하고 있습니다.
            <br />
            귀하와 좋은 인연이 되길 희망합니다.
          </p>
        </div>
      </div>
      <WorkSectionClient sections={portfolioSections} />
    </section>
  );
}

export function PhotosSection({ sections }) {
  return (
    <section className="section photos-section" id="photos" aria-labelledby="photos-title">
      <div className="section-heading">
        <p className="section-kicker">Profile, snaps, daily</p>
        <h2 id="photos-title">PHOTOS</h2>
      </div>
      <PhotoGallery sections={sections} />
    </section>
  );
}

export async function getPhotoSectionsAndHero() {
  const sections = await getResolvedPhotoSections();
  return { sections };
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 NAM YUL</p>
      <div className="footer-links">
        {socials.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
        <button type="button" data-open-contact>
          Message
        </button>
      </div>
    </footer>
  );
}

export function ContactModal() {
  return (
    <dialog className="contact-modal" id="contact-modal" aria-labelledby="contact-title">
      <form className="contact-card" id="contact-form" method="dialog" noValidate>
        <div className="contact-header">
          <div>
            <p className="section-kicker">Get in touch</p>
            <h2 id="contact-title">CONTACT</h2>
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
        <label>
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          <span>Message</span>
          <textarea name="message" rows="5" required />
        </label>
        <p className="form-status" id="form-status" aria-live="polite" />
        <div className="modal-actions">
          <button type="button" className="ghost-button" data-close-contact>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Send
          </button>
        </div>
      </form>
    </dialog>
  );
}
