import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/microcms";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <Link href={`/${article.category[0]}/${article.id}`} className="article-card block group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {article.eyecatch ? (
          <Image
            src={article.eyecatch.url}
            alt={article.eyecatch.alt ?? article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center">
            <span className="text-text-sub text-xs font-sans tracking-wider">NO IMAGE</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] tracking-[0.2em] text-white bg-primary px-2 py-0.5 uppercase">
            {article.category[0]}
          </span>
          <time className="text-[11px] text-text-sub tracking-wider">
            {new Date(article.publishedAt ?? Date.now()).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </time>
        </div>
        <h3 className="font-serif text-base md:text-lg leading-snug text-text-main group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-xs text-text-sub leading-relaxed line-clamp-2 font-sans">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
