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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group block relative overflow-hidden aspect-square"
          >
            <Image
              src={t.image}
              alt={t.label}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-serif text-2xl tracking-[0.2em]">{t.label}</h3>
              <p className="text-xs tracking-widest text-white/80 mt-1 font-sans">{t.ja}</p>
              <p className="text-xs text-white/70 mt-2 font-sans leading-relaxed">
                {t.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
