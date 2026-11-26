import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { GalleryItem } from '../src/types';
import { sortGalleryItems } from '../src/utils/sortGalleryItems';

function item(id: string, createdAt?: string): GalleryItem {
  return {
    id,
    type: 'video',
    title: id,
    category: 'Past Events',
    url: 'https://example.com/video',
    thumbnail: '',
    description: '',
    createdAt,
  };
}

test('orders dated gallery items newest first without mutating the input', () => {
  const input = [
    item('older', '2026-11-25T10:00:00.000Z'),
    item('newer', '2026-11-26T10:00:00.000Z'),
    item('middle', '2026-11-25T12:00:00.000Z'),
  ];
  assert.deepEqual(sortGalleryItems(input).map(entry => entry.id), ['newer', 'middle', 'older']);
  assert.deepEqual(input.map(entry => entry.id), ['older', 'newer', 'middle']);
});

test('keeps undated and invalid legacy items in their original order after dated items', () => {
  const input = [
    item('legacy'),
    item('invalid', 'not-a-date'),
    item('new', '2026-11-26T10:00:00.000Z'),
    item('archive'),
  ];
  assert.deepEqual(sortGalleryItems(input).map(entry => entry.id), ['new', 'legacy', 'invalid', 'archive']);
});
