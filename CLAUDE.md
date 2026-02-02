# Senior Engineer Diary Blog

Astro v5 + Tailwind CSS v4 製のブログ。GitHub Pages にデプロイされる。

## 記事の追加手順

### 1. ファイルを作成する

`src/content/posts/` に Markdown ファイルを作成する。

- ファイル名は英語のケバブケース（例: `my-new-post.md`）
- ファイル名がそのまま URL のスラッグになる（`/posts/my-new-post`）

### 2. frontmatter を書く

ファイル先頭に以下の形式で frontmatter を記述する。全フィールド必須（`excerpt` と `coverImage` のみ任意）。

```yaml
---
title: "記事タイトル"
category: "カテゴリ名"
categorySlug: "category-slug"
tags: ["タグ1", "タグ2"]
excerpt: "記事の概要（任意）"
publishedAt: 2025-02-02
---
```

### 3. 既存のカテゴリ一覧

| category | categorySlug |
|---|---|
| Web開発 | web-dev |
| AI・機械学習 | ai |
| クラウド | cloud |

新しいカテゴリを使う場合は、日本語の `category` と英語ケバブケースの `categorySlug` をセットで指定すればよい。

### 4. 本文を書く

frontmatter の `---` の後に Markdown で本文を書く。コードブロックや画像も使用可能。

### 5. コミット & プッシュ

```
git add src/content/posts/新しい記事.md
git commit -m "Add post: 記事タイトル"
git push
```

`main` ブランチへの push で GitHub Actions が自動ビルド・デプロイを実行する。

## 記事テンプレート

以下をコピーして使う。

```markdown
---
title: ""
category: ""
categorySlug: ""
tags: []
excerpt: ""
publishedAt: 2025-01-01
---

## はじめに



## 本文



## まとめ

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
