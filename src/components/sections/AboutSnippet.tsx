import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AboutSettings } from "@/lib/microcms";

type Props = {
  about?: AboutSettings | null;
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";

export default function AboutSnippet({ about }: Props) {
  return (
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto section-padding">
        {/* SP・PCともに横2分割 */}
        <div className="grid grid-cols-2 gap-6 md:gap-16 items-center">
          {/* 写真 */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={about?.mairoImage?.url ?? FALLBACK_IMAGE}
              alt="MAIRO"
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* テキスト */}
          <div>
            <p className="text-[10px] md:text-xs tracking-[0.2em] text-primary font-sans mb-2 md:mb-4">ABOUT MAIRO</p>
            <h2 className="font-serif text-xl md:text-4xl text-text-main leading-snug">
              {about?.snippetTitle ?? (
                <>マイロと歩く、<br />小さくて<br className="md:hidden" />大切な毎日。</>
              )}
            </h2>
            {about?.snippetBody ? (
              <p className="mt-3 md:mt-6 text-xs md:text-sm leading-relaxed md:leading-[2] text-text-sub font-sans line-clamp-4 md:line-clamp-none">
                {about.snippetBody}
              </p>
            ) : (
              <p className="mt-3 md:mt-6 text-xs md:text-sm leading-relaxed md:leading-[2] text-text-sub font-sans line-clamp-4 md:line-clamp-none">
                こんにちは。マイロというゴールデンレトリバーと暮らしているフリーランスのまなです。
                犬と旅することが大好きで、行く先々のカフェや宿を記録しています。
              </p>
            )}
            <Link
              href="/about"
              className="mt-4 md:mt-8 inline-flex items-center gap-1 text-[10px] md:text-xs tracking-[0.2em] text-primary hover:text-primary-dark transition-colors font-sans group"
            >
              ABOUT
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
