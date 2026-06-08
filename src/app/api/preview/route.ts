import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/**
 * 下書きプレビュー用APIルート
 * microCMS の「プレビュー」ボタンを押したときにここが呼ばれる
 *
 * URL例: /api/preview?secret=xxx&id=article-id&category=travel
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  // シークレットチェック
  if (secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!id || !category) {
    return new Response("Missing id or category", { status: 400 });
  }

  // Draft Modeを有効化
  const draft = await draftMode();
  draft.enable();

  // 記事詳細ページにリダイレクト
  redirect(`/${category}/${id}`);
}
