import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { getArticlesByCategory } from "@/lib/microcms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "CAFE",
  description: "犬OKのカフェをめぐる、テラスでのんびりカフェ記録",
};

export default async function CafePage() {
  const { contents } = await getArticlesByCategory("cafe", { limit: 100 });

  return (
    <>
      <PageHero
        title="CAFE"
        subtitle="カフェ"
        image="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80"
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
