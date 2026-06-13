import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import type { SiteSettings } from "@/lib/microcms";

const FALLBACK_TOPICS = [
  {
    href: "/travel",
    label: "TRAVEL",
    ja: "旅行・おでかけ",
    description: "マイロと一緒に旅する、犬連れ旅行の記録",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  },
  {
    href: "/cafe",
    label: "CAFE",
    ja: "カフェ",
    description: "犬OKのカフェを探して、テラスでのんびり",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
  },
  {
    href: "/life",
    label: "LIFE",
    ja: "日常・くらし",
    description: "フリーランスの日常と、マイロとの毎日",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80",
  },
];

type Props = {
  settings?: SiteSettings | null;
};

export default function TopicsSection({ settings }: Props) {
  const topics = [
    {
      href: "/travel",
      label: "TRAVEL",
      ja: "旅行・おでかけ",
      description: "マイロと一緒に旅する、犬連れ旅行の記録",
      image: settings?.travelImage?.url ?? FALLBACK_TOPICS[0].image,
    },
    {
      href: "/cafe",
      label: "CAFE",
      ja: "カフェ",
      description: "犬OKのカフェを探して、テラスでのんびり",
      image: settings?.cafeImage?.url ?? FALLBACK_TOPICS[1].image,
    },
    {
      href: "/life",
      label: "LIFE",
      ja: "日常・くらし",
      description: "フリーランスの日常と、マイロとの毎日",
      image: settings?.lifeImage?.url ?? FALLBACK_TOPICS[2].image,
    },
  ];

  return (
    <section className="section-padding max-w-7xl mx-auto">
      <SectionTitle en="TOPICS" ja="カテゴリ" center />
      {/* SP: 2×2グリッド / PC: 3列横並び */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col items-center text-center gap-3"
          >
            {/* 丸い画像 */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border">
              <Image
                src={t.image}
                alt={t.label}
                fill
                sizes="(max-width: 768px) 80px, 112px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              />
            </div>
            {/* テキスト */}
            <div>
              <h3 className="font-serif text-base md:text-lg tracking-[0.15em] text-text-main">
                {t.label}
              </h3>
              <p className="text-xs text-text-sub font-sans mt-1 leading-relaxed">
                {t.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
