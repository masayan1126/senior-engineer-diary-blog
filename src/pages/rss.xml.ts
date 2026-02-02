import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '@/lib/content';
import { SITE } from '@/lib/constants';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site?.toString() || SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.excerpt || '',
      link: `/posts/${post.id}/`,
    })),
    customData: '<language>ja</language>',
  });
}
