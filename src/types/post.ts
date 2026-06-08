export type Category = "travel" | "cafe" | "life";

// 静的ダミーデータ用の型（posts.ts で使用）
export type Post = {
  slug: string;
  title: string;
  category: Category;
  date: string;
  thumbnail: string;
  excerpt: string;
  tags: string[];
};
