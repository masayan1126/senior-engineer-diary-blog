import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export async function getAllPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts');
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export async function getAllCategories(): Promise<
  { name: string; slug: string; description?: string }[]
> {
  const posts = await getCollection('posts');
  const categoryMap = new Map<
    string,
    { name: string; slug: string }
  >();

  for (const post of posts) {
    if (!categoryMap.has(post.data.categorySlug)) {
      categoryMap.set(post.data.categorySlug, {
        name: post.data.category,
        slug: post.data.categorySlug,
      });
    }
  }

  return Array.from(categoryMap.values());
}

export async function getAllTags(): Promise<{ name: string; slug: string }[]> {
  const posts = await getCollection('posts');
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet)
    .sort()
    .map((tag) => ({
      name: tag,
      slug: tag.toLowerCase().replace(/[\s.]+/g, '-'),
    }));
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostEntry[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.categorySlug === categorySlug);
}

export async function getPostsByTag(tagSlug: string): Promise<PostEntry[]> {
  const posts = await getAllPosts();
  return posts.filter((p) =>
    p.data.tags.some(
      (t) => t.toLowerCase().replace(/[\s.]+/g, '-') === tagSlug
    )
  );
}
