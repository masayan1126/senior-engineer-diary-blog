# 記事テンプレート

```markdown
---
title: ""
category: ""
categorySlug: ""
tags: []
emoji: ""
excerpt: ""
series: ""
seriesOrder: 1
publishedAt: 2026-01-01
---

ここに本文を書く。セクション分けは必要に応じて自由に。
```

## フィールド説明

- **title**: 記事タイトル（必須）
- **category / categorySlug**: カテゴリ名と英語ケバブケーススラッグのセット（必須）
- **tags**: タグ配列（必須）
- **emoji**: 記事カードのサムネイル表示。未指定時は📝がデフォルト。既存と被らないこと（任意）
- **excerpt**: 記事の概要（任意）
- **series / seriesOrder**: シリーズのスラッグと通し番号。シリーズに属さない場合は省略可（任意）
- **publishedAt**: 記事作成時の日付を正確に設定すること。テンプレートの日付をそのまま使わない（必須）
