import { Instagram } from "lucide-react";
import BeholdWidget from "@/components/ui/BeholdWidget";
import Image from "next/image";

// Beholdが未設定のときに表示するプレースホルダー画像
const placeholderImages = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
  "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80",
];

type Props = {
  instagramUrl?: string;
  beholdFeedId?: string;  // microCMSから渡すフィードID
};

export default function InstagramSection({
  instagramUrl = "https://instagram.com",
  beholdFeedId,
}: Props) {
  return (
    <section className="bg-surface section-padding">
      <div className="max-w-7xl mx-auto">
        {/* セクションヘッダー */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-text-sub">
            <Instagram size={18} />
            <span className="text-xs tracking-[0.25em] font-sans">@mairo_life</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-[0.15em] text-text-main mt-3">
            INSTAGRAM
          </h2>
          <div className="mt-4 h-px w-12 bg-primary mx-auto" />
        </div>

        {/* フィード表示エリア */}
        {beholdFeedId ? (
          /* Behold連携済み → 本物のInstagram投稿を表示 */
          <div className="behold-wrapper">
            <BeholdWidget feedId={beholdFeedId} />
          </div>
        ) : (
          /* 未設定 → プレースホルダー画像 */
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {placeholderImages.map((src, i) => (
              <a
                key={i}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* フォローボタン */}
        <div className="mt-8 text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Instagram size={14} />
            フォローする
          </a>
        </div>
      </div>
    </section>
  );
}
