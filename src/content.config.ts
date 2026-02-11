import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    tags: z.array(z.string()).default([]),
    emoji: z.string().optional(),
    excerpt: z.string().optional(),
    publishedAt: z.coerce.date(),
    coverImage: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

export const collections = { posts };
