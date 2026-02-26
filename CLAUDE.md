# Senior Engineer Diary Blog

Astro v5 + Tailwind CSS v4 製のブログ。GitHub Pages にデプロイされる。

`main` ブランチへの push で GitHub Actions が自動ビルド・デプロイを実行する。

## 記事作成

記事の作成は `blog-post-creator` スキルを使用すること。

## 静的アセットのパス

`public/` 配下のファイルを参照する際は `import.meta.env.BASE_URL` を使うこと。`base` が `/senior-engineer-diary-blog` に設定されているため、直接 `/filename` と書くとパスが解決できない。

```astro
<!-- ✅ 正しい -->
<img src={`${import.meta.env.BASE_URL}/favicon.svg`} />

<!-- ❌ 誤り（baseが含まれない） -->
<img src="/favicon.svg" />
```

## プロジェクト構成（参考）

```
src/
  content/posts/    … 記事 Markdown ファイル
  components/       … Astro コンポーネント
  layouts/          … レイアウト
  pages/            … ルーティング
  lib/              … 定数・ユーティリティ
```
