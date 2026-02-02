---
title: "Astro v5 + Tailwind CSS v4 でブログを構築する"
category: "Web開発"
categorySlug: "web-dev"
tags: ["Astro", "TypeScript", "Tailwind CSS"]
emoji: "🚀"
excerpt: "Astro v5とTailwind CSS v4を使って、パフォーマンスに優れたブログサイトを構築する方法を紹介します。"
publishedAt: 2024-12-01
---

## はじめに

Astro v5とTailwind CSS v4を使って、パフォーマンスに優れたブログサイトを構築する方法を紹介します。

## Astro v5の特徴

Astro v5は、コンテンツ中心のWebサイトを構築するためのフレームワークです。デフォルトでゼロJavaScriptを出力し、必要な場合にのみクライアントサイドのJavaScriptを読み込みます。

### 主な特徴

- コンテンツコレクション
- View Transitions
- サーバーアイランド

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
});
```

## まとめ

Astro v5とTailwind CSS v4の組み合わせは、高速で美しいブログサイトを構築するための最適な選択肢です。
