"use client";

import { useEffect, useState } from "react";
import { placeholderSvg } from "../lib/placeholder-svg";

export function PhotoGallery({ sections }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const allPhotos = sections.flatMap((section) =>
    section.photos.map((photo) => ({
      ...photo,
      sectionTitle: section.title,
    }))
  );

  useEffect(() => {
    const openers = document.querySelectorAll("[data-open-contact]");
    const closers = document.querySelectorAll("[data-close-contact]");
    const modal = document.getElementById("contact-modal");

    const openModal = () => {
      document.body.classList.add("modal-open");
      modal?.showModal();
    };

    const closeModal = () => {
      modal?.close();
      document.body.classList.remove("modal-open");
    };

    openers.forEach((button) => button.addEventListener("click", openModal));
    closers.forEach((button) => button.addEventListener("click", closeModal));

    return () => {
      openers.forEach((button) => button.removeEventListener("click", openModal));
      closers.forEach((button) => button.removeEventListener("click", closeModal));
    };
  }, []);

  useEffect(() => {
    if (currentIndex === null) {
      document.body.classList.remove("modal-open");
      return;
    }

    document.body.classList.add("modal-open");

    const keyHandler = (event) => {
      if (event.key === "Escape") {
        setCurrentIndex(null);
      }
      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) => (index - 1 + allPhotos.length) % allPhotos.length);
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((index) => (index + 1) % allPhotos.length);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [allPhotos.length, currentIndex]);

  const activePhoto = currentIndex === null ? null : allPhotos[currentIndex];

  return (
    <>
      <div className="photo-sections">
        {sections.map((section) => (
          <section className="photo-section" key={section.title} aria-labelledby={`photo-section-${section.title.toLowerCase()}`}>
            <div className="photo-section-header">
              <h3 id={`photo-section-${section.title.toLowerCase()}`}>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="photo-grid">
              {section.photos.map((photo) => {
                const photoIndex = allPhotos.findIndex(
                  (entry) => entry.title === photo.title && entry.sectionTitle === section.title
                );

                return (
                  <article className="photo-card" key={`${section.title}-${photo.title}`}>
                    <button
                      type="button"
                      className="photo-button"
                      onClick={() => setCurrentIndex(photoIndex)}
                      aria-label={`Open ${photo.title}`}
                    >
                      <img
                        src={
                          photo.src ||
                          placeholderSvg({
                            label: photo.title,
                            colors: photo.palette,
                            ratio: [4, 5],
                          })
                        }
                        alt={photo.title}
                        loading="lazy"
                      />
                      <p className="photo-caption">{photo.title}</p>
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {activePhoto ? (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Photo lightbox">
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Close lightbox"
            onClick={() => setCurrentIndex(null)}
          />
          <div className="lightbox-shell">
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close photo viewer"
              onClick={() => setCurrentIndex(null)}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-nav prev"
              aria-label="Previous photo"
              onClick={() =>
                setCurrentIndex((index) => (index - 1 + allPhotos.length) % allPhotos.length)
              }
            >
              ‹
            </button>
            <figure className="lightbox-figure">
              <img
                src={
                  activePhoto.src ||
                  placeholderSvg({
                    label: activePhoto.title,
                    colors: activePhoto.palette,
                    ratio: [4, 5],
                  })
                }
                alt={activePhoto.title}
              />
              <figcaption>
                {activePhoto.sectionTitle} / {activePhoto.title}
              </figcaption>
            </figure>
            <button
              type="button"
              className="lightbox-nav next"
              aria-label="Next photo"
              onClick={() => setCurrentIndex((index) => (index + 1) % allPhotos.length)}
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
