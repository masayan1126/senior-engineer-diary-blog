const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return `${base}${path}`;
}

export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadingTime(text: string): number {
  const plainText = text.replace(/<[^>]*>/g, '');
  // Japanese: ~400 chars/min, English: ~200 words/min
  const japaneseChars = plainText.replace(/[a-zA-Z0-9\s]/g, '').length;
  const englishWords = plainText.replace(/[^\x00-\x7F]/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = japaneseChars / 400 + englishWords / 200;
  return Math.max(1, Math.ceil(minutes));
}
