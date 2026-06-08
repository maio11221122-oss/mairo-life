import HeroSection from "@/components/sections/HeroSection";
import TopicsSection from "@/components/sections/TopicsSection";
import AboutSnippet from "@/components/sections/AboutSnippet";
import CategorySection from "@/components/sections/CategorySection";
import InstagramSection from "@/components/sections/InstagramSection";
import { getLatestArticlesByCategory, getSiteSettings, getAboutSettings } from "@/lib/microcms";

export const revalidate = 60;

export default async function HomePage() {
  const [siteSettings, aboutSettings, travelRes, cafeRes, lifeRes] = await Promise.all([
    getSiteSettings().catch(() => null),
    getAboutSettings().catch(() => null),
    getLatestArticlesByCategory("travel", 3),
    getLatestArticlesByCategory("cafe", 3),
    getLatestArticlesByCategory("life", 3),
  ]);

  return (
    <>
      <HeroSection settings={siteSettings ?? undefined} />
      <TopicsSection />
      <AboutSnippet about={aboutSettings} />
      <CategorySection category="travel" articles={travelRes.contents} />
      <CategorySection category="cafe" articles={cafeRes.contents} bg />
      <CategorySection category="life" articles={lifeRes.contents} />
      <InstagramSection
        instagramUrl={siteSettings?.instagramUrl}
        beholdFeedId={siteSettings?.beholdFeedId}
      />
    </>
  );
}
