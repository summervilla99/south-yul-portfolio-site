import {
  ContactModal,
  Footer,
  getPhotoSectionsAndHero,
  Header,
  HeroSection,
  PhotosSection,
  WorkSection,
} from "../components/portfolio";

export default async function HomePage() {
  const { sections } = await getPhotoSectionsAndHero();

  return (
    <>
      <div className="page-shell">
        <Header />
        <main>
          <HeroSection />
          <WorkSection />
          <PhotosSection sections={sections} />
        </main>
        <Footer />
      </div>
      <ContactModal />
    </>
  );
}
