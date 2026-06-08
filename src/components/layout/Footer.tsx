import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import type { SiteSettings } from "@/lib/microcms";

const navLinks = [
  { href: "/", label: "TOP" },
  { href: "/about", label: "ABOUT" },
  { href: "/travel", label: "TRAVEL" },
  { href: "/cafe", label: "CAFE" },
  { href: "/life", label: "LIFE" },
  { href: "/contact", label: "CONTACT" },
];

type Props = {
  settings?: SiteSettings;
};

export default function Footer({ settings }: Props) {
  const instagramUrl = settings?.instagramUrl || "https://instagram.com";
  const twitterUrl = settings?.twitterUrl || "https://twitter.com";

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col items-center gap-8">
        <Link href="/" className="font-serif italic text-2xl tracking-widest text-text-main">
          MAIRO LIFE
        </Link>

        <div className="flex items-center gap-5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-text-sub hover:text-primary transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-text-sub hover:text-primary transition-colors"
          >
            <Twitter size={20} />
          </a>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.2em] text-text-sub hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-text-sub tracking-widest">
          © {new Date().getFullYear()} MAIRO LIFE
        </p>
      </div>
    </footer>
  );
}
