import { parseBlocks, type Block } from '@/components/ui/changelog/markdown';
import type { ReleaseSummary } from './github-releases';

export type TocEntry = { title: string; url: string; depth: number };
export type AnnotatedRelease = {
  release: ReleaseSummary;
  id: string;
  blocks: Array<Block & { id?: string }>;
};

function slugify(text: string) {
  return (
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') ||
    'section'
  );
}

export function buildChangelogToc(releases: ReleaseSummary[]) {
  const usedIds = new Set<string>();
  const uniqueId = (raw: string) => {
    let id = slugify(raw);
    let n = 1;
    while (usedIds.has(id)) id = `${slugify(raw)}-${n++}`;
    usedIds.add(id);
    return id;
  };

  const toc: TocEntry[] = [];
  const annotated: AnnotatedRelease[] = releases.map((release) => {
    const releaseId = uniqueId(release.tagName);
    toc.push({ title: release.tagName, url: `#${releaseId}`, depth: 2 });

    const blocks = parseBlocks(release.body).map((block) => {
      if (block.type !== 'heading') return block;
      const id = uniqueId(`${release.tagName}-${block.text}`);
      toc.push({ title: block.text, url: `#${id}`, depth: Math.min(block.level + 2, 6) });
      return { ...block, id };
    });

    return { release, id: releaseId, blocks };
  });

  return { annotated, toc };
}
