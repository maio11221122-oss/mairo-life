import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/microcms";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MAIRO LIFE",
    template: "%s | MAIRO LIFE",
  },
  description:
    "愛犬マイロとの暮らし、おでかけ、旅行、カフェ、フリーランスの日常を発信するライフスタイルメディア",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "MAIRO LIFE",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // サイト設定を取得（SNSリンクをFooterに渡す）
  const siteSettings = await getSiteSettings().catch(() => undefined);

  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${notoSerif.variable} ${notoSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer settings={siteSettings} />
      </body>
    </html>
  );
}
