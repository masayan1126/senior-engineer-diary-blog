import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { SITE } from './constants';
import { getAllPosts } from './content';

let fontCache: ArrayBuffer | null = null;

async function getFont(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache;

  // Try local Japanese fonts first (available in some CI environments)
  const localFontPaths = [
    '/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf',
    '/usr/share/fonts/truetype/fonts-japanese-gothic.ttf',
  ];

  for (const fontPath of localFontPaths) {
    try {
      const buf = await readFile(fontPath);
      fontCache = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      return fontCache;
    } catch {
      // Font not found, try next
    }
  }

  // Fall back to fetching from Google Fonts (works in CI with network access)
  const posts = await getAllPosts();
  const allText =
    posts.map((p) => p.data.title).join('') +
    posts.map((p) => p.data.category).join('') +
    SITE.title;
  const uniqueChars = [...new Set(allText)].join('');

  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(uniqueChars)}`;
  const css = await fetch(googleFontsUrl, {
    headers: {
      // User agent that triggers TrueType format (satori doesn't support woff2)
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  }).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) {
    throw new Error('Failed to extract font URL from Google Fonts CSS');
  }

  const fontData = await fetch(match[1]).then((r) => r.arrayBuffer());
  fontCache = fontData;
  return fontCache;
}

export async function generateOgImage(title: string, emoji: string): Promise<Buffer> {
  const fontData = await getFont();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          fontFamily: 'OgFont',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { fontSize: '96px', lineHeight: '1' },
                    children: emoji,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '56px',
                      color: '#f8fafc',
                      lineHeight: '1.4',
                      letterSpacing: '-0.02em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#94a3b8',
                    },
                    children: SITE.title,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'OgFont',
          data: fontData,
          style: 'normal',
        },
      ],
      loadAdditionalAsset: async (languageCode: string, segment: string) => {
        if (languageCode === 'emoji') {
          // Convert emoji to Twemoji SVG code point format
          const codePoints = [...segment]
            .map((c) => c.codePointAt(0)?.toString(16))
            .filter(Boolean)
            .join('-');
          try {
            const res = await fetch(
              `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`,
            );
            if (res.ok) {
              const svgText = await res.text();
              return `data:image/svg+xml,${encodeURIComponent(svgText)}`;
            }
          } catch {
            // Network unavailable, fall back to empty string
          }
          return '';
        }
        return [];
      },
    },
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
