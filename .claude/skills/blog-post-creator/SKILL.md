---
name: blog-post-creator
description: Senior Engineer Diary Blogの記事作成スキル。記事の新規作成、frontmatter設定、校正チェック、絵文字選定、シリーズ管理を行う。ユーザーが「記事を書いて」「ブログ記事を作成」「ポストを追加」などと依頼したときに使用する。
---

# ブログ記事作成

## ワークフロー

1. `src/content/posts/` にケバブケースのMDファイルを作成（ファイル名 = URLスラッグ）
2. [references/template.md](references/template.md) のテンプレートでfrontmatterを記述
3. [references/emojis.md](references/emojis.md) で使用済み絵文字を確認し、被らない絵文字を選定
4. [references/categories.md](references/categories.md) でカテゴリ・シリーズを確認
5. 本文を執筆（下記ルール参照）
6. 校正チェック実施
7. 絵文字一覧・シリーズ一覧を更新（必要に応じて）

## 本文の書き方

- 体裁を整えたり記事っぽく飾らない。日記のようにシンプルに書く
- 以下の4点を素朴に書く:
  1. **何をしたか**
  2. **なぜしたのか**
  3. **どうやってしたのか**
  4. **やってみての感想**
- 「はじめに」「まとめ」のような定型セクションは不要

## 校正チェック（コミット前に必須）

1. **漢字変換の確認**: ひらがなのまま放置されていないか（例: 「じゅうど」→「重度」）
2. **誤字脱字のチェック**: 変換ミス・タイポがないか通読
3. **構成の確認**: 4セクションが揃っているか
4. **内容の正確性**: 事実誤認や文意が通らない箇所がないか

## 画像の配置

- 画像は `public/images/` に配置
- Markdownでの参照パス: `/senior-engineer-diary-blog/images/ファイル名`

## コミット

```
git add src/content/posts/新しい記事.md
git commit -m "Add post: 記事タイトル"
```

## 更新すべきファイル

記事追加後、以下のファイルも更新する:
- [references/emojis.md](references/emojis.md): 使用した絵文字を追記
- [references/categories.md](references/categories.md): 新シリーズ追加時に更新（+ `src/lib/constants.ts` の `SERIES_MAP`）
