"use client";

import { useState } from "react";

export function PersonalInfoCard({ profileSummary }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hero-profile-card${collapsed ? " is-collapsed" : ""}`}
      aria-label="Personal summary"
    >
      <div className="hero-profile-card-header">
        <p className="hero-card-kicker">Personal Info</p>
        <button
          type="button"
          className="hero-profile-toggle"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand personal info" : "Collapse personal info"}
          onClick={() => setCollapsed((current) => !current)}
        >
          <span className="hero-profile-toggle-label">
            {collapsed ? "Open" : "Hide"}
          </span>
          <span className="hero-profile-toggle-icon" aria-hidden="true">
            {collapsed ? "+" : "−"}
          </span>
        </button>
      </div>

      <div className="hero-profile-card-body">
        <dl className="hero-profile-grid">
          <div>
            <dt>Age</dt>
            <dd>
              {profileSummary.age} ({profileSummary.birth})
            </dd>
          </div>
          <div>
            <dt>Physical</dt>
            <dd>
              {profileSummary.height} | {profileSummary.weight}
            </dd>
          </div>
          <div>
            <dt>Talents</dt>
            <dd>
              {profileSummary.talents.slice(0, 3).join(", ")},
              <br />
              {profileSummary.talents.slice(3).join(", ")}
            </dd>
          </div>
          <div>
            <dt>Hobbies</dt>
            <dd>{profileSummary.hobbies.join(", ")}</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${profileSummary.email}`}>{profileSummary.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
