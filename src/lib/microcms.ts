import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";
import type { Category } from "@/types/post";

// ──────────────────────────────────────────────
// microCMS クライアント
// ──────────────────────────────────────────────
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// ══════════════════════════════════════════════
// 型定義
// ══════════════════════════════════════════════

// ── 記事 ──────────────────────────────────────
export type Article = MicroCMSListContent & {
  title: string;
  category: Category[];   // microCMSのセレクトフィールドは配列で返る
  eyecatch: MicroCMSImage;
  content: string;         // リッチエディタ（HTML）
  excerpt: string;         // 記事の概要
  tags: string[];          // タグ
  seoTitle?: string;       // SEOタイトル（空欄→titleを使用）
  seoDescription?: string; // SEOディスクリプション
};

// ── サイト設定 ────────────────────────────────
export type SiteSettings = {
  heroImage: MicroCMSImage;       // TOPヒーロー画像
  catchCopy: string;              // キャッチコピー（例：愛犬と歩く、毎日のこと）
  subCopy: string;                // サブコピー（例：旅 ・ カフェ ・ くらし）
  instagramUrl: string;           // InstagramのURL
  twitterUrl: string;             // X（Twitter）のURL
  beholdFeedId?: string;          // Behold.so フィードID（Instagramウィジェット）
  travelImage?: MicroCMSImage;    // TOPICSカード画像（TRAVEL）
  cafeImage?: MicroCMSImage;      // TOPICSカード画像（CAFE）
  lifeImage?: MicroCMSImage;      // TOPICSカード画像（LIFE）
};

// ── Aboutページ設定 ───────────────────────────
export type AboutSettings = {
  ownerName: string;              // 運営者名
  ownerImage: MicroCMSImage;      // プロフィール画像
  ownerBio: string;               // 自己紹介（リッチエディタHTML）
  mairoImage: MicroCMSImage;      // マイロの写真
  mairoBio: string;               // マイロの紹介文（リッチエディタHTML）
  mairoBreed: string;             // 犬種
  mairoGender: string;            // 性別
  mairoBirthday: string;          // 誕生日
  mairoLikes: string;             // 好きなこと
  mairoDislikes: string;          // 苦手なこと
  siteDescription: string;        // このサイトについて（ABOUTページ下部）
  snippetTitle?: string;          // TOPページのキャッチコピー（例：マイロと歩く、小さくて大切な毎日。）
  snippetBody?: string;           // TOPページのAboutスニペット本文（Aboutページとは別に管理）
};

// ── Contactページ設定 ─────────────────────────
export type ContactSettings = {
  pageTitle: string;              // ページタイトル
  description: string;           // 説明文
  formTitle?: string;             // フォームタイトル（例：お問い合わせ / 無料相談）
  submitMessage?: string;         // 送信完了メッセージ
  isHubspotEnabled: string[];     // HubSpot有効フラグ（"true" / "false"）
  hubspotPortalId?: string;       // HubSpotポータルID
  hubspotFormId?: string;         // HubSpotフォームID
};

// ══════════════════════════════════════════════
// 記事 API
// ══════════════════════════════════════════════

export async function getArticles(queries?: MicroCMSQueries) {
  return client.getList<Article>({
    endpoint: "articles",
    queries: { limit: 12, orders: "-publishedAt", ...queries },
  });
}

export async function getArticlesByCategory(category: Category, queries?: MicroCMSQueries) {
  return getArticles({
    filters: `category[contains]${category}`,
    ...queries,
  });
}

export async function getLatestArticlesByCategory(category: Category, limit = 3) {
  return getArticles({
    filters: `category[contains]${category}`,
    limit,
  });
}

export async function getArticleById(id: string, queries?: MicroCMSQueries) {
  return client.getListDetail<Article>({
    endpoint: "articles",
    contentId: id,
    queries,
  });
}

// 1000件以上対応：全記事IDを取得
export async function getAllArticleIds(category?: Category): Promise<string[]> {
  const limit = 100;
  let offset = 0;
  let allIds: string[] = [];
  while (true) {
    const res = await getArticles({
      fields: "id",
      limit,
      offset,
      ...(category ? { filters: `category[contains]${category}` } : {}),
    });
    allIds = [...allIds, ...res.contents.map((c) => c.id)];
    if (offset + limit >= res.totalCount) break;
    offset += limit;
  }
  return allIds;
}

// ══════════════════════════════════════════════
// サイト設定 API（オブジェクト形式）
// ══════════════════════════════════════════════

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.getObject<SiteSettings>({ endpoint: "site-settings" });
}

// ══════════════════════════════════════════════
// About設定 API（オブジェクト形式）
// ══════════════════════════════════════════════

export async function getAboutSettings(): Promise<AboutSettings> {
  return client.getObject<AboutSettings>({ endpoint: "about" });
}

// ══════════════════════════════════════════════
// Contact設定 API（オブジェクト形式）
// ══════════════════════════════════════════════

export async function getContactSettings(): Promise<ContactSettings> {
  return client.getObject<ContactSettings>({ endpoint: "contact" });
}
