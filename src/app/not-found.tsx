import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-serif text-6xl text-primary">404</p>
      <h1 className="mt-4 font-serif text-2xl tracking-[0.1em] text-text-main">
        Page Not Found
      </h1>
      <p className="mt-4 text-sm text-text-sub font-sans">
        お探しのページが見つかりませんでした。
      </p>
      <Link href="/" className="mt-8 btn-outline">
        TOPへ戻る
      </Link>
    </div>
  );
}
