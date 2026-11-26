import type { GalleryItem } from '../types';

function creationTime(item: GalleryItem): number {
  const timestamp = item.createdAt ? Date.parse(item.createdAt) : NaN;
  return Number.isFinite(timestamp) ? timestamp : -Infinity;
}

export function sortGalleryItems(items: GalleryItem[]): GalleryItem[] {
  return [...items].sort((a, b) => {
    const timeA = creationTime(a);
    const timeB = creationTime(b);
    return timeA === timeB ? 0 : timeA > timeB ? -1 : 1;
  });
}
