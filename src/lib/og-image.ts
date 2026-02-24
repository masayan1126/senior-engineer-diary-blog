import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from './constants';
import { getAllPosts } from './content';

let fontCache: ArrayBuffer | null = null;
let characterImageCache: string | null = null;

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

async function getCharacterImage(): Promise<string> {
  if (characterImageCache) return characterImageCache;

  const imagePath = join(process.cwd(), 'public/icons/icon-192x192.png');
  const imageBuffer = await readFile(imagePath);
  const base64 = imageBuffer.toString('base64');
  characterImageCache = `data:image/png;base64,${base64}`;
  return characterImageCache;
}

export async function generateOgImage(
  title: string,
  emoji: string,
  category?: string,
): Promise<Buffer> {
  const fontData = await getFont();
  const characterImage = await getCharacterImage();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#111111',
          fontFamily: 'OgFont',
        },
        children: [
          // Left yellow accent bar
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                left: '0',
                top: '0',
                width: '6px',
                height: '100%',
                background: '#fbbf24',
              },
            },
          },
          // Text content area
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: '56px 60px 50px 56px',
              },
              children: [
                // Top: Emoji + Category
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: '40px', lineHeight: '1' },
                          children: emoji,
                        },
                      },
                      ...(category
                        ? [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '20px',
                                  color: '#fbbf24',
                                  border: '1.5px solid #fbbf24',
                                  borderRadius: '6px',
                                  padding: '4px 14px',
                                },
                                children: category,
                              },
                            },
                          ]
                        : []),
                    ],
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '52px',
                      color: '#ffffff',
                      lineHeight: '1.4',
                      letterSpacing: '-0.01em',
                      paddingRight: '180px',
                      overflow: 'hidden',
                    },
                    children: title,
                  },
                },
                // Bottom: Site name
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '40px',
                            height: '2px',
                            background: '#fbbf24',
                          },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '20px',
                            color: '#888888',
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
          // Character image (bottom-right)
          {
            type: 'img',
            props: {
              src: characterImage,
              width: 150,
              height: 150,
              style: {
                position: 'absolute',
                bottom: '36px',
                right: '44px',
                width: '150px',
                height: '150px',
                borderRadius: '16px',
              },
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
