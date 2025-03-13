import { faker } from '@faker-js/faker';

const TAGS = [
  'Research', 'Analysis', 'Report', 'Draft', 
  'Confidential', 'Public', 'Internal', 
  'Marketing', 'Technical', 'Legal'
];

const AUTHORS = [
  'John Smith', 'Emily Chen', 'Michael Rodriguez', 
  'Sarah Johnson', 'David Kim', 'Lisa Patel', 
  'Alex Williams', 'Emma Thompson', 'Ryan Garcia'
];

export function generateChunkMetadata() {
  return {
    date: faker.date.recent({ days: 90 }).toISOString(),
    author: faker.helpers.arrayElement(AUTHORS),
    filepath: faker.system.filePath(),
    tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 3 }),
    note: faker.lorem.sentence()
  };
}

export function normalizeContentLength(chunks: any[]) {
  const shortestChunkLength = Math.min(...chunks.map(chunk => chunk.content.length));

  return chunks.map(chunk => ({
    ...chunk,
    content: chunk.content.slice(0, shortestChunkLength).trim()
  }));
}

export function enhanceChunksWithMetadata(chunks: any[]) {
  const normalizedChunks = normalizeContentLength(chunks);

  return normalizedChunks.map(chunk => ({
    ...chunk,
    ...generateChunkMetadata()
  }));
}
