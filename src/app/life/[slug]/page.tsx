import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import ArticleBody from "@/components/ui/ArticleBody";
import { getArticleById, getAllArticleIds } from "@/lib/microcms";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllArticleIds("life");
  return ids.map((id) => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleById(slug);
    return {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      openGraph: {
        title: article.seoTitle ?? article.title,
        description: article.seoDescription ?? article.excerpt,
        images: article.eyecatch ? [{ url: article.eyecatch.url }] : [],
      },
    };
  } catch {
    return { title: "記事が見つかりません" };
  }
}

export default async function LifeArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled: isDraft } = await draftMode();

  let article;
  try {
    article = await getArticleById(slug, {
      draftKey: isDraft && draftKey ? draftKey : undefined,
    });
  } catch {
    notFound();
  }
  if (!article?.category?.includes("life")) notFound();
  return <ArticleBody article={article!} isDraft={isDraft} />;
}
