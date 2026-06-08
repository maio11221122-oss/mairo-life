# MAIRO LIFE — セットアップ手順

## 必要なもの
- Node.js 18以上（https://nodejs.org からインストール）

## 初回セットアップ

```bash
# プロジェクトフォルダに移動
cd C:\Users\user\Documents\Claude\Projects\mairo-life

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開くとサイトが表示されます。

## ビルド（本番用）

```bash
npm run build
npm start
```

## Vercelへのデプロイ

1. https://vercel.com にアクセスしてアカウント作成
2. GitHubにこのフォルダをプッシュ
3. Vercelから「New Project」でリポジトリを選択
4. そのままDeployボタンを押すだけで公開完了

## フォルダ構成

```
src/
├── app/          ← 各ページ（page.tsx）
├── components/
│   ├── layout/   ← Header・Footer
│   ├── ui/       ← 汎用パーツ（カード・ボタンなど）
│   └── sections/ ← TOPページ専用セクション
├── lib/
│   └── posts.ts  ← 記事データ（ここに記事を追加する）
├── styles/
│   └── globals.css
└── types/
    └── post.ts
```

## 記事を追加するには

`src/lib/posts.ts` の `posts` 配列に以下の形式で追加してください：

```ts
{
  slug: "記事のURL（英数字・ハイフンのみ）",
  title: "記事タイトル",
  category: "travel" | "cafe" | "life",
  date: "YYYY-MM-DD",
  thumbnail: "画像URL",
  excerpt: "記事の要約（一覧に表示される）",
  tags: ["タグ1", "タグ2"],
}
```
