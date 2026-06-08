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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* 写真 */}
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
            <Image
              src={about?.mairoImage?.url ?? FALLBACK_IMAGE}
              alt="MAIRO"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* テキスト */}
          <div>
            <p className="text-xs tracking-[0.3em] text-primary font-sans mb-4">ABOUT MAIRO</p>
            <h2 className="font-serif text-3xl md:text-4xl text-text-main leading-tight">
              {about?.snippetTitle ?? (
                <>マイロと歩く、<br />小さくて大切な毎日。</>
              )}
            </h2>
            {about?.snippetBody ? (
              <p className="mt-6 text-sm leading-[2] text-text-sub font-sans">
                {about.snippetBody}
              </p>
            ) : (
              <p className="mt-6 text-sm leading-[2] text-text-sub font-sans">
                こんにちは。マイロというゴールデンレトリバーと暮らしているフリーランスのまなです。
                犬と旅することが大好きで、行く先々のカフェや宿を記録しています。
                このサイトでは、マイロとの暮らしをゆったりと発信していきます。
              </p>
            )}
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-primary hover:text-primary-dark transition-colors font-sans group"
            >
              ABOUT
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
