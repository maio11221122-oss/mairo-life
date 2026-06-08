"use client";

import { useEffect } from "react";

type Props = {
  feedId: string;
};

// Behold.so の Instagram フィードウィジェット
// feedId は Behold管理画面 → Feeds → Feed ID から取得
export default function BeholdWidget({ feedId }: Props) {
  useEffect(() => {
    // すでに読み込み済みの場合はスキップ
    if (document.getElementById("behold-widget-script")) return;

    const script = document.createElement("script");
    script.id = "behold-widget-script";
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("behold-widget-script");
      if (el) el.remove();
    };
  }, []);

  // @ts-ignore — behold-widget はカスタム要素のため型定義なし
  return <behold-widget feed-id={feedId} />;
}
