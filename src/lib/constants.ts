export const SITE = {
  title: 'とあるシニアエンジニアの日記',
  description: '業務/プライベートでの学び、発見、気づきなどを取り止めもなく描きます。',
  url: 'https://masayan1126.github.io/senior-engineer-diary-blog',
  author: 'シニアエンジニア',
  lang: 'ja',
  ogImage: '/og-default.png',
} as const;

export const NAV_ITEMS = [
  { label: 'ホーム', href: '/' },
  { label: 'カテゴリ', href: '/categories' },
  { label: 'タグ', href: '/tags' },
  { label: 'About', href: '/about' },
] as const;

export const PER_PAGE = 12;
