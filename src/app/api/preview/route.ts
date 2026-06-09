import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

// キャッシュを無効化（プレビューAPIは常に動的に実行）
export const dynamic = "force-dynamic";

/**
 * 下書きプレビュー用APIルート
 * microCMS の「プレビュー」ボタンを押したときにここが呼ばれる
 *
 * URL例: /api/preview?secret=xxx&id=article-id&category=travel
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  // microCMSは {CONTENT_ID} を contentId または id として渡す
  const id = searchParams.get("id") ?? searchParams.get("contentId");
  const category = searchParams.get("category");
  const draftKey = searchParams.get("draftKey");

  // シークレットチェック
  if (secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  // Draft Modeを有効化
  const draft = await draftMode();
  draft.enable();

  // カテゴリが不明な場合はAPIで取得して判定
  if (category) {
    redirect(`/${category}/${id}?draftKey=${draftKey}`);
  }

  // カテゴリ未指定の場合はmicroCMSから記事を取得してカテゴリを判定
  const { getArticleById } = await import("@/lib/microcms");

  // 記事取得（draftKeyありで試みる、失敗したらなしで再試行）
  let article;
  try {
    article = await getArticleById(id, { draftKey: draftKey ?? undefined });
  } catch {
    try {
      article = await getArticleById(id);
    } catch (err2) {
      const message = err2 instanceof Error ? err2.message : String(err2);
      return new Response(`記事が見つかりません: id=${id} / ${message}`, { status: 404 });
    }
  }

  const cat = article!.category?.[0];
  const suffix = draftKey ? `?draftKey=${draftKey}` : "";
  redirect(cat ? `/${cat}/${id}${suffix}` : `/travel/${id}${suffix}`);
}
