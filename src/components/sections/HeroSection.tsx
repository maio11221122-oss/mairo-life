"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { SiteSettings } from "@/lib/microcms";

type Props = {
  settings: SiteSettings;
};

export default function HeroSection({ settings }: Props) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <Image
        src={settings.heroImage.url}
        alt={settings.heroImage.alt ?? "MAIRO LIFE hero"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs md:text-sm tracking-[0.35em] text-white/90 font-sans mb-4">
          {settings.catchCopy}
        </p>
        <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-white drop-shadow-sm">
          MAIRO LIFE
        </h1>
        <p className="mt-4 text-xs md:text-sm tracking-[0.3em] text-white/80 font-sans">
          {settings.subCopy}
        </p>
        <Link
          href="/travel"
          className="mt-10 btn-outline border-white text-white hover:bg-white hover:text-text-main"
        >
          記事を読む
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 animate-bounce">
        <span className="text-[10px] tracking-[0.2em] font-sans">SCROLL</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
