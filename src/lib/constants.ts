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
  { label: '今週', href: '/weekly' },
  { label: 'カテゴリ', href: '/categories' },
  { label: 'シリーズ', href: '/series' },
  { label: 'タグ', href: '/tags' },
  { label: 'About', href: '/about' },
] as const;

export const PER_PAGE = 12;

export const SERIES_MAP: Record<string, { name: string; slug: string; description: string }> = {
  typeless: {
    name: 'Typeless音声入力シリーズ',
    slug: 'typeless',
    description: '音声入力アプリTypelessを試して使い込んでいく過程を記録したシリーズ',
  },
  'zundamon-youtube': {
    name: 'ずんだもん解説動画シリーズ',
    slug: 'zundamon-youtube',
    description: 'ずんだもんAIニュース解説動画チャンネルの立ち上げから成長までの記録',
  },
};
