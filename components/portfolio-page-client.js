"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ContactModal,
  Footer,
  Header,
  HeroSection,
  PhotosSection,
  WorkSection,
} from "./portfolio";
import {
  footerSocials,
  portfolioSectionsByLocale,
  profileSummaryByLocale,
  siteCopy,
} from "../lib/site-content";

export function PortfolioPageClient({ sections }) {
  const [locale, setLocale] = useState("ko");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const copy = siteCopy[locale];
  const profileSummary = profileSummaryByLocale[locale];
  const portfolioSections = portfolioSectionsByLocale[locale];

  const localizedPhotoSections = useMemo(() => {
    return sections.map((section) => {
      const localized = copy.photoSections[section.folder] || {};
      return {
        ...section,
        title: localized.title || section.title,
        description: localized.description || section.description,
      };
    });
  }, [copy.photoSections, sections]);

  return (
    <>
      <div className="page-shell">
        <Header copy={copy} locale={locale} setLocale={setLocale} />
        <main>
          <HeroSection profileSummary={profileSummary} personalInfoCopy={copy.personalInfo} />
          <WorkSection copy={copy} sections={portfolioSections} />
          <PhotosSection copy={copy} sections={localizedPhotoSections} />
        </main>
        <Footer socials={footerSocials} />
      </div>
      <ContactModal copy={copy.contactModal} />
    </>
  );
}
