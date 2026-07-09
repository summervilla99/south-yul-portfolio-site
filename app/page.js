import {
  getPhotoSectionsAndHero,
} from "../components/portfolio";
import { PortfolioPageClient } from "../components/portfolio-page-client";

export default async function HomePage() {
  const { sections } = await getPhotoSectionsAndHero();

  return <PortfolioPageClient sections={sections} />;
}
