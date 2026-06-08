import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@/lib/microcms";
import type { Category } from "@/types/post";

const categoryLabel: Record<Category, string> = {
  travel: "TRAVEL",
  cafe: "CAFE",
  life: "LIFE",
};

type Props = {
  article: Article;
  isDraft?: boolean;
};

export default function ArticleBody({ article, isDraft = false }: Props) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-2xl mx-auto section-padding">

      {/* 下書きバナー */}
      {isDraft && (
        <div className="mb-6 bg-yellow-50 border border-yellow-300 text-yellow-800 text-xs font-sans tracking-wider px-4 py-3 text-center">
          🖊 これは下書きプレビューです。公開はされていません。
        </div>
      )}

      {/* パンくず */}
      <Link
        href={`/${article.category[0]}`}
        className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] text-text-sub hover:text-primary transition-colors font-sans mb-8 group"
      >
        <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
        {categoryLabel[article.category[0]]}
      </Link>

      {/* アイキャッチ */}
      {article.eyecatch && (
        <div className="relative aspect-[16/9] overflow-hidden mb-8">
          <Image
            src={article.eyecatch.url}
            alt={article.eyecatch.alt ?? article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>
      )}

      {/* タグ */}
      {article.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-wider text-primary border border-primary px-2 py-0.5 font-sans"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* タイトル・日付 */}
      <h1 className="font-serif text-2xl md:text-3xl text-text-main leading-snug">
        {article.title}
      </h1>
      <time className="block mt-3 text-xs text-text-sub tracking-wider font-sans">
        {publishedDate}
      </time>

      {/* 本文（リッチエディタHTML） */}
      <div
        className="mt-8 border-t border-border pt-8 article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
