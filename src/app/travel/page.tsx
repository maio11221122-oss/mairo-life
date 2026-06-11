import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { getArticlesByCategory, getSiteSettings } from "@/lib/microcms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "TRAVEL",
  description: "マイロと一緒に旅する、犬連れ旅行の記録",
};

const FALLBACK = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80";

export default async function TravelPage() {
  const [{ contents }, siteSettings] = await Promise.all([
    getArticlesByCategory("travel", { limit: 100 }),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <>
      <PageHero
        title="TRAVEL"
        subtitle="旅行・おでかけ"
        image={siteSettings?.travelImage?.url ?? FALLBACK}
      />
      <section className="max-w-7xl mx-auto section-padding">
        {contents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-sub font-sans py-24 text-sm">
            記事を準備中です。しばらくお待ちください。
          </p>
        )}
      </section>
    </>
  );
}
