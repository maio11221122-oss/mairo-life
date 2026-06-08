"use client";

import { useEffect } from "react";

type Props = {
  portalId: string;
  formId: string;
  submitMessage?: string; // 送信完了メッセージ（管理画面から設定）
};

export default function HubSpotForm({ portalId, formId, submitMessage }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId,
          formId,
          target: "#hubspot-form-container",
          // 送信完了メッセージを上書き（管理画面で設定した文言を使用）
          ...(submitMessage
            ? { inlineMessage: `<p class="text-sm text-text-main font-sans text-center py-8">${submitMessage}</p>` }
            : {}),
        });
      }
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [portalId, formId, submitMessage]);

  return (
    <div
      id="hubspot-form-container"
      className="[&_.hs-form]:font-sans [&_input]:w-full [&_input]:border [&_input]:border-border [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:bg-white [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-border [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:bg-white [&_.hs-button]:btn-primary [&_.hs-button]:cursor-pointer"
    />
  );
}
