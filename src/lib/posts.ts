import type { Post, Category } from "@/types/post";

export const posts: Post[] = [
  {
    slug: "kyoto-dog-friendly-trip",
    title: "京都で愛犬と過ごす2泊3日 ― 犬連れ旅行の完全ガイド",
    category: "travel",
    date: "2024-11-15",
    thumbnail: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    excerpt: "マイロと初めての京都旅行。犬OKのお宿から散歩コースまで、全部まとめました。",
    tags: ["京都", "犬連れ旅行", "旅行記"],
  },
  {
    slug: "kamakura-beach-walk",
    title: "鎌倉・由比ヶ浜でマイロと波と遊んだ休日",
    category: "travel",
    date: "2024-10-20",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    excerpt: "海が初めてのマイロ。波に驚いたり、砂を掘ったり、最高の一日でした。",
    tags: ["鎌倉", "海", "おでかけ"],
  },
  {
    slug: "hakone-pet-hotel",
    title: "箱根の犬連れOK温泉宿レポート ― マイロも一緒に温泉旅",
    category: "travel",
    date: "2024-09-08",
    thumbnail: "https://images.unsplash.com/photo-1611048267451-e6ed903c1a6a?w=800&q=80",
    excerpt: "犬と泊まれる温泉旅館を探してたどり着いた箱根の宿。部屋食でゆっくりできました。",
    tags: ["箱根", "温泉", "ペット可宿"],
  },
  {
    slug: "nakameguro-dog-cafe",
    title: "中目黒のテラス席でゆっくりコーヒー ― 犬OKカフェ3選",
    category: "cafe",
    date: "2024-11-01",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    excerpt: "マイロと一緒に入れる中目黒カフェをまとめました。テラス席でのんびりが最高。",
    tags: ["中目黒", "カフェ", "犬連れカフェ"],
  },
  {
    slug: "shimokitazawa-cafe-walk",
    title: "下北沢カフェ散歩 ― マイロと一緒に歩いて見つけた隠れ家カフェ",
    category: "cafe",
    date: "2024-10-05",
    thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    excerpt: "下北沢の路地を散歩しながら見つけた、犬連れOKの素敵なカフェをご紹介。",
    tags: ["下北沢", "カフェ巡り", "お散歩"],
  },
  {
    slug: "koenji-antique-cafe",
    title: "高円寺のレトロカフェでマイロとのんびり読書時間",
    category: "cafe",
    date: "2024-09-22",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    excerpt: "古本屋が並ぶ高円寺で見つけたアンティーク調カフェ。テラスでマイロと過ごす午後。",
    tags: ["高円寺", "レトロカフェ", "読書"],
  },
  {
    slug: "freelance-morning-routine",
    title: "フリーランスの朝ルーティン ― マイロの散歩から始まる一日",
    category: "life",
    date: "2024-11-10",
    thumbnail: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&q=80",
    excerpt: "朝6時の散歩、コーヒー、仕事開始。マイロがいるだけで毎朝が特別になる。",
    tags: ["フリーランス", "朝活", "日常"],
  },
  {
    slug: "dog-goods-favorites",
    title: "マイロのお気に入りグッズ2024 ― 買ってよかったもの10選",
    category: "life",
    date: "2024-10-28",
    thumbnail: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&q=80",
    excerpt: "今年買ったドッググッズの中から、本当に使ってよかったものを厳選してご紹介。",
    tags: ["ドッググッズ", "おすすめ", "愛犬"],
  },
  {
    slug: "wfh-with-dog",
    title: "犬と在宅ワーク ― 集中できる環境の作り方",
    category: "life",
    date: "2024-09-30",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    excerpt: "マイロがそばにいる在宅ワーク。邪魔されながらも幸せな働き方のコツを共有します。",
    tags: ["在宅ワーク", "フリーランス", "犬との生活"],
  },
];

export function getPostsByCategory(category: Category): Post[] {
  return posts.filter((p) => p.category === category);
}

export function getLatestByCategory(category: Category, count = 3): Post[] {
  return getPostsByCategory(category).slice(0, count);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
