import type { Metadata } from "next";
import Image from "next/image";
import { getAboutSettings } from "@/lib/microcms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ABOUT",
  description: "MAIRO LIFEについて、マイロと飼い主のご紹介",
};

// データ未入力時に使うデフォルト値
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";

export default async function AboutPage() {
  const about = await getAboutSettings().catch(() => null);

  const mairoProfile = [
    { label: "犬種",     value: about?.mairoBreed },
    { label: "性別",     value: about?.mairoGender },
    { label: "誕生日",   value: about?.mairoBirthday },
    { label: "好きなこと", value: about?.mairoLikes },
    { label: "苦手なこと", value: about?.mairoDislikes },
  ].filter((p) => p.value);

  return (
    <>
      {/* ヒーロー */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src={about?.ownerImage?.url ?? DEFAULT_IMAGE}
          alt="ABOUT"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.2em] text-white drop-shadow-sm">
            ABOUT
          </h1>
        </div>
      </section>

      {/* 運営者プロフィール */}
      <section className="max-w-3xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={about?.ownerImage?.url ?? DEFAULT_IMAGE}
              alt={about?.ownerName ?? "プロフィール"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-primary font-sans mb-3">PROFILE</p>
            <h2 className="font-serif text-3xl text-text-main">
              {about?.ownerName ?? ""}
            </h2>
            <div className="mt-1 h-px w-8 bg-primary" />
            {about?.ownerBio ? (
              <div
                className="mt-5 text-sm leading-[2] text-text-sub font-sans"
                dangerouslySetInnerHTML={{ __html: about.ownerBio }}
              />
            ) : (
              <p className="mt-5 text-sm leading-[2] text-text-sub font-sans">
                管理画面から自己紹介文を入力してください。
              </p>
            )}
          </div>
        </div>
      </section>

      {/* マイロプロフィール */}
      <section className="bg-surface">
        <div className="max-w-3xl mx-auto section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-primary font-sans mb-3">DOG PROFILE</p>
              <h2 className="font-serif text-3xl text-text-main">MAIRO</h2>
              <div className="mt-1 h-px w-8 bg-primary" />
              {about?.mairoBio ? (
                <div
                  className="mt-5 text-sm leading-[2] text-text-sub font-sans"
                  dangerouslySetInnerHTML={{ __html: about.mairoBio }}
                />
              ) : (
                <p className="mt-5 text-sm leading-[2] text-text-sub font-sans">
                  管理画面からマイロの紹介文を入力してください。
                </p>
              )}
              {mairoProfile.length > 0 && (
                <div className="mt-6 space-y-3">
                  {mairoProfile.map(({ label, value }) => (
                    <div key={label} className="flex gap-4 text-sm border-b border-border pb-3">
                      <span className="w-24 text-[11px] tracking-wider text-text-sub font-sans shrink-0">
                        {label}
                      </span>
                      <span className="text-text-main font-sans">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={about?.mairoImage?.url ?? DEFAULT_IMAGE}
                alt="MAIRO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* このサイトについて */}
      {about?.siteDescription && (
        <section className="max-w-3xl mx-auto section-padding text-center">
          <p className="text-xs tracking-[0.3em] text-primary font-sans mb-3">ABOUT THIS SITE</p>
          <h2 className="font-serif text-3xl text-text-main">このサイトについて</h2>
          <div className="mt-4 h-px w-12 bg-primary mx-auto" />
          <p className="mt-8 text-sm leading-[2.2] text-text-sub font-sans max-w-xl mx-auto">
            {about.siteDescription}
          </p>
        </section>
      )}
    </>
  );
}
