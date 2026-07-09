"use client";

import { useEffect, useState } from "react";
import { placeholderSvg } from "../lib/placeholder-svg";

export function WorkSectionClient({ sections }) {
  const [currentWorkImageIndex, setCurrentWorkImageIndex] = useState(null);
  const [previewIndices, setPreviewIndices] = useState({});
  const workVisuals = sections.flatMap((section) =>
    section.entries.flatMap((entry) =>
      (entry.thumbnailSources || []).map((src, index) => ({
        src,
        title: entry.title,
        sectionTitle: section.title,
        imageIndex: index,
      }))
    )
  );

  useEffect(() => {
    if (currentWorkImageIndex === null) {
      document.body.classList.remove("modal-open");
      return;
    }

    document.body.classList.add("modal-open");

    const keyHandler = (event) => {
      if (event.key === "Escape") {
        setCurrentWorkImageIndex(null);
      }
      if (event.key === "ArrowLeft") {
        setCurrentWorkImageIndex(
          (index) => (index - 1 + workVisuals.length) % workVisuals.length
        );
      }
      if (event.key === "ArrowRight") {
        setCurrentWorkImageIndex((index) => (index + 1) % workVisuals.length);
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [currentWorkImageIndex, workVisuals.length]);

  useEffect(() => {
    const cards = document.querySelectorAll(".reveal-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const activeWorkVisual =
    currentWorkImageIndex === null ? null : workVisuals[currentWorkImageIndex];

  return (
    <>
      <div className="credit-groups">
        {sections.map((section) => (
          <section
            className={`credit-group credit-group-${section.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            key={section.title}
          >
            <div className="credit-group-header">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="credit-list">
              {section.entries.map((entry) => (
                <article
                  className={`act-card reveal-card${entry.hasVisual === false ? " no-visual" : ""}`}
                  key={`${section.title}-${entry.year}-${entry.title}`}
                >
                  {entry.hasVisual === false ? (
                    <div className="act-visual act-visual-empty" aria-hidden="true" />
                  ) : entry.thumbnailSources?.length ? (
                    <div
                      className="act-visual act-visual-button"
                      onClick={() =>
                        setCurrentWorkImageIndex(
                          workVisuals.findIndex(
                            (visual) =>
                              visual.title === entry.title &&
                              visual.src ===
                                entry.thumbnailSources[previewIndices[entry.title] || 0]
                          )
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setCurrentWorkImageIndex(
                            workVisuals.findIndex(
                              (visual) =>
                                visual.title === entry.title &&
                                visual.src ===
                                  entry.thumbnailSources[previewIndices[entry.title] || 0]
                            )
                          );
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open image gallery for ${entry.title}`}
                    >
                      <img
                        src={entry.thumbnailSources[previewIndices[entry.title] || 0]}
                        alt={`${entry.title} thumbnail`}
                        loading="lazy"
                      />
                      {entry.thumbnailSources.length > 1 ? (
                        <div className="act-visual-controls" aria-hidden="true">
                          <span className="act-visual-count">
                            {(previewIndices[entry.title] || 0) + 1}/{entry.thumbnailSources.length}
                          </span>
                          <button
                            type="button"
                            className="act-visual-nav prev"
                            onClick={(event) => {
                              event.stopPropagation();
                              setPreviewIndices((current) => ({
                                ...current,
                                [entry.title]:
                                  ((current[entry.title] || 0) - 1 + entry.thumbnailSources.length) %
                                  entry.thumbnailSources.length,
                              }));
                            }}
                            aria-label={`Previous thumbnail for ${entry.title}`}
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            className="act-visual-nav next"
                            onClick={(event) => {
                              event.stopPropagation();
                              setPreviewIndices((current) => ({
                                ...current,
                                [entry.title]:
                                  ((current[entry.title] || 0) + 1) % entry.thumbnailSources.length,
                              }));
                            }}
                            aria-label={`Next thumbnail for ${entry.title}`}
                          >
                            ›
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : entry.externalUrl ? (
                    <a
                      className="act-visual act-visual-link"
                      href={entry.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open external link for ${entry.title}`}
                    >
                      <img
                        src={placeholderSvg({
                          label: entry.title,
                          colors: entry.palette,
                          ratio: [16, 10],
                        })}
                        alt={`${entry.title} thumbnail`}
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div className="act-visual">
                      <img
                        src={placeholderSvg({
                          label: entry.title,
                          colors: entry.palette,
                          ratio: [16, 10],
                        })}
                        alt={`${entry.title} thumbnail`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="act-meta">
                    <div className="act-title-row">
                      <p className="credit-year">{entry.year}</p>
                      <h4>{entry.title}</h4>
                    </div>
                    <p className="act-description">{entry.description}</p>
                    {[entry.role, entry.detail, entry.note].filter(Boolean).length ? (
                      <p className="credit-meta">
                        {[entry.role, entry.detail, entry.note].filter(Boolean).join(" | ")}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeWorkVisual ? (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Work image lightbox">
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Close lightbox"
            onClick={() => setCurrentWorkImageIndex(null)}
          />
          <div className="lightbox-shell">
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close work image viewer"
              onClick={() => setCurrentWorkImageIndex(null)}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-nav prev"
              aria-label="Previous work image"
              onClick={() =>
                setCurrentWorkImageIndex(
                  (index) => (index - 1 + workVisuals.length) % workVisuals.length
                )
              }
            >
              ‹
            </button>
            <figure className="lightbox-figure">
              <img src={activeWorkVisual.src} alt={activeWorkVisual.title} />
              <figcaption>
                {activeWorkVisual.sectionTitle} / {activeWorkVisual.title}
              </figcaption>
            </figure>
            <button
              type="button"
              className="lightbox-nav next"
              aria-label="Next work image"
              onClick={() =>
                setCurrentWorkImageIndex((index) => (index + 1) % workVisuals.length)
              }
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
