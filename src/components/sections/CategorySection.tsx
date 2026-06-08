import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/ui/ArticleCard";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Article } from "@/lib/microcms";
import type { Category } from "@/types/post";

const categoryMeta: Record<Category, { ja: string }> = {
  travel: { ja: "旅行・おでかけ" },
  cafe: { ja: "カフェ" },
  life: { ja: "日常・くらし" },
};

type Props = {
  category: Category;
  articles: Article[];
  bg?: boolean;
};

export default function CategorySection({ category, articles, bg = false }: Props) {
  const meta = categoryMeta[category];

  return (
    <section className={bg ? "bg-surface" : ""}>
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-end justify-between">
          <SectionTitle en={category.toUpperCase()} ja={meta.ja} />
          <Link
            href={`/${category}`}
            className="hidden md:inline-flex items-center gap-1.5 text-xs tracking-[0.2em] text-text-sub hover:text-primary transition-colors font-sans group"
          >
            もっと見る
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-text-sub font-sans text-center py-12">
            記事を準備中です。しばらくお待ちください。
          </p>
        )}

        <div className="mt-8 md:hidden text-center">
          <Link
            href={`/${category}`}
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] text-text-sub hover:text-primary transition-colors font-sans"
          >
            もっと見る <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
