import type { Metadata } from "next";
import { getContactSettings, getSiteSettings } from "@/lib/microcms";
import { Instagram, Twitter } from "lucide-react";
import HubSpotForm from "@/components/ui/HubSpotForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "CONTACT",
  description: "MAIRO LIFEへのお問い合わせ",
};

export default async function ContactPage() {
  const [contact, site] = await Promise.all([
    getContactSettings().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  // HubSpot有効かどうか（管理画面のON/OFFで切り替え）
  const hubspotEnabled =
    contact?.isHubspotEnabled?.[0] === "true" &&
    !!contact?.hubspotPortalId &&
    !!contact?.hubspotFormId;

  return (
    <>
      {/* ページヘッダー */}
      <section className="py-16 md:py-20 text-center border-b border-border">
        <h1 className="font-serif text-5xl md:text-6xl tracking-[0.2em] text-text-main">
          {contact?.pageTitle ?? "CONTACT"}
        </h1>
        <p className="mt-3 text-xs tracking-[0.25em] text-text-sub font-sans">お問い合わせ</p>
      </section>

      <section className="max-w-xl mx-auto section-padding">

        {/* 説明文 */}
        {contact?.description && (
          <p className="text-sm leading-[2.2] text-text-sub font-sans text-center whitespace-pre-line">
            {contact.description}
          </p>
        )}

        {/* フォームエリア */}
        <div className="mt-12">
          {contact?.formTitle && (
            <h2 className="font-serif text-2xl text-text-main mb-6 text-center">
              {contact.formTitle}
            </h2>
          )}

          {hubspotEnabled ? (
            /* HubSpotフォーム（ONのとき） */
            <HubSpotForm
              portalId={contact!.hubspotPortalId!}
              formId={contact!.hubspotFormId!}
              submitMessage={contact!.submitMessage}
            />
          ) : (
            /* プレースホルダー（OFFのとき or データ未入力） */
            <div className="border border-dashed border-border bg-surface p-10 text-center">
              <p className="text-xs tracking-[0.25em] text-text-sub font-sans">
                お問い合わせフォームは近日公開予定です
              </p>
              <p className="mt-2 text-[11px] text-text-sub/60 font-sans">
                現在はSNSよりご連絡ください
              </p>
            </div>
          )}
        </div>

        {/* SNS */}
        <div className="mt-16 text-center">
          <p className="text-xs tracking-[0.3em] text-primary font-sans mb-6">SNS</p>
          <div className="flex justify-center gap-8">
            {site?.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-text-sub hover:text-primary transition-colors"
              >
                <Instagram size={22} />
                <span className="text-[10px] tracking-[0.2em] font-sans">INSTAGRAM</span>
              </a>
            )}
            {site?.twitterUrl && (
              <a
                href={site.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-text-sub hover:text-primary transition-colors"
              >
                <Twitter size={22} />
                <span className="text-[10px] tracking-[0.2em] font-sans">X / TWITTER</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
