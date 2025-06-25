// utils/normalizeTag.ts
export const normalizeTag = (tag: string) =>
  tag.toLowerCase().trim().replace(/\s+/g, '-');
