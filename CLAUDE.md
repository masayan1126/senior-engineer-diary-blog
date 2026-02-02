# Senior Engineer Diary Blog

Astro v5 + Tailwind CSS v4 製のブログ。GitHub Pages にデプロイされる。

## 記事の追加手順

### 1. ファイルを作成する

`src/content/posts/` に Markdown ファイルを作成する。

- ファイル名は英語のケバブケース（例: `my-new-post.md`）
- ファイル名がそのまま URL のスラッグになる（`/posts/my-new-post`）

### 2. frontmatter を書く

ファイル先頭に以下の形式で frontmatter を記述する。全フィールド必須（`emoji`、`excerpt`、`coverImage` は任意）。

```yaml
---
title: "記事タイトル"
category: "カテゴリ名"
categorySlug: "category-slug"
tags: ["タグ1", "タグ2"]
emoji: "🎯"
excerpt: "記事の概要（任意）"
publishedAt: 2025-02-02
---
```

**emoji について:** 記事カードのサムネイルに表示される。既存記事と被らない絵文字を選ぶこと。未指定時は 📝 がデフォルト表示される。

### 3. 既存のカテゴリ一覧

| category | categorySlug |
|---|---|
| コンテンツ制作 | content-creation |

新しいカテゴリを使う場合は、日本語の `category` と英語ケバブケースの `categorySlug` をセットで指定すればよい。

### 4. 本文を書く

frontmatter の `---` の後に Markdown で本文を書く。コードブロックや画像も使用可能。

**記事の書き方のルール:**
- 体裁を整えたり記事っぽく飾らないこと。日記のようにシンプルに書く
- 以下の4点を素朴に書けばOK:
  1. **何をしたか**
  2. **なぜしたのか**
  3. **どうやってしたのか**
  4. **やってみての感想**
- 「はじめに」「まとめ」のような定型セクションは不要

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
emoji: ""
excerpt: ""
publishedAt: 2025-01-01
---

ここに本文を書く。セクション分けは必要に応じて自由に。
```

## 使用済み絵文字一覧

記事追加時はここを確認し、被らない絵文字を選ぶこと。追加後はこのリストも更新する。

| emoji | 記事 |
|---|---|
| 📝 | voicevox-remotion-zundamon-youtube（未設定・デフォルト） |

## プロジェクト構成（参考）

```
src/
  content/posts/    … 記事 Markdown ファイル
  components/       … Astro コンポーネント
  layouts/          … レイアウト
  pages/            … ルーティング
  lib/              … 定数・ユーティリティ
```
