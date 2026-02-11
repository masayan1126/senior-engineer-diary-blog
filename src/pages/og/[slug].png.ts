import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllPosts } from '@/lib/content';
import { generateOgImage } from '@/lib/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, emoji: post.data.emoji || '📝' },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, emoji } = props as { title: string; emoji: string };
  const png = await generateOgImage(title, emoji);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
