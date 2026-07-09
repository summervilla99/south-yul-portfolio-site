"use client";

import { useState } from "react";

export function PersonalInfoCard({ profileSummary, copy }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hero-profile-card${collapsed ? " is-collapsed" : ""}`}
      aria-label="Personal summary"
    >
      <div className="hero-profile-card-header">
        <p className="hero-card-kicker">{copy.title}</p>
        <button
          type="button"
          className="hero-profile-toggle"
          aria-expanded={!collapsed}
          aria-label={collapsed ? copy.expand : copy.collapse}
          onClick={() => setCollapsed((current) => !current)}
        >
          <span className="hero-profile-toggle-icon" aria-hidden="true">
            {collapsed ? "+" : "−"}
          </span>
        </button>
      </div>

      <div className="hero-profile-card-body">
        <dl className="hero-profile-grid">
          <div>
            <dt>{copy.age}</dt>
            <dd>
              {profileSummary.age} ({profileSummary.birth})
            </dd>
          </div>
          <div>
            <dt>{copy.physical}</dt>
            <dd>
              {profileSummary.height} | {profileSummary.weight}
            </dd>
          </div>
          <div>
            <dt>{copy.talents}</dt>
            <dd>
              {profileSummary.talents.slice(0, 3).join(", ")},
              <br />
              {profileSummary.talents.slice(3).join(", ")}
            </dd>
          </div>
          <div>
            <dt>{copy.hobbies}</dt>
            <dd>{profileSummary.hobbies.join(", ")}</dd>
          </div>
          <div>
            <dt>{copy.contact}</dt>
            <dd>
              <a href={`mailto:${profileSummary.email}`}>{profileSummary.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
