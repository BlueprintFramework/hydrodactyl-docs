import type { ReactNode } from 'react';

export type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'paragraph'; text: string };

export function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const lines = body.split(/\r?\n/);

  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {
    if (paragraphLines.length) {
      blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: 'list', ordered: listOrdered, items: listItems });
      listItems = [];
      listOrdered = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const bulletMatch = line.match(/^[-*+]\s+(.*)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);

    if (bulletMatch || orderedMatch) {
      flushParagraph();
      if (!listItems.length) {
        listOrdered = Boolean(orderedMatch);
      }
      listItems.push((bulletMatch ?? orderedMatch)![1].trim());
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function linkProps(href: string) {
  return {
    href,
    target: '_blank' as const,
    rel: 'noreferrer noopener',
    className: 'text-fd-accent hover:underline break-all',
  };
}

function shortenRepoReference(url: string): string | null {
  const match = url.match(
    /^https?:\/\/github\.com\/BlueprintFramework\/hydrodactyl\/(?:pull|issues)\/(\d+)(?:\/.*)?(?:[?#].*)?$/i
  );
  return match ? `#${match[1]}` : null;
}

function linkLabel(url: string, explicitLabel?: string) {
  if (explicitLabel && explicitLabel !== url) {
    return explicitLabel;
  }
  return shortenRepoReference(url) ?? explicitLabel ?? url;
}

function splitTrailingPunctuation(url: string) {
  const match = url.match(/^(.*?)([.,;:!?)\]}>]+)$/);
  if (!match) {
    return { url, trailing: '' };
  }

  let cleaned = match[1];
  let trailing = match[2];

  while (trailing.startsWith(')') && cleaned.includes('(')) {
    const open = (cleaned.match(/\(/g) ?? []).length;
    const close = (cleaned.match(/\)/g) ?? []).length;
    if (open > close) {
      cleaned += ')';
      trailing = trailing.slice(1);
    } else {
      break;
    }
  }

  return { url: cleaned, trailing };
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*|@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?(?:\[[^\]]+\])?)|(https?:\/\/[^\s<]+)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      nodes.push(
        <a key={`${keyPrefix}-${i++}`} {...linkProps(match[2])}>
          {linkLabel(match[2], match[1])}
        </a>
      );
    } else if (match[3]) {
      nodes.push(<strong key={`${keyPrefix}-${i++}`}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(
        <code
          key={`${keyPrefix}-${i++}`}
          className="rounded bg-fd-muted px-1 py-0.5 text-[0.85em]"
        >
          {match[4]}
        </code>
      );
    } else if (match[5]) {
      nodes.push(<em key={`${keyPrefix}-${i++}`}>{match[5]}</em>);
    } else if (match[0].startsWith('@')) {
      const username = match[0].slice(1).replace(/\[bot\]$/i, '');
      nodes.push(
        <a key={`${keyPrefix}-${i++}`} {...linkProps(`https://github.com/${username}`)}>
          {match[0]}
        </a>
      );
    } else if (match[6]) {
      const { url, trailing } = splitTrailingPunctuation(match[6]);
      nodes.push(
        <a key={`${keyPrefix}-${i++}`} {...linkProps(url)}>
          {linkLabel(url)}
        </a>
      );
      if (trailing) {
        nodes.push(trailing);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function renderBlocks(blocks: Array<Block & { id?: string }>): ReactNode {
  return blocks.map((block, index) => {
    const key = `block-${index}`;

    if (block.type === 'heading') {
      const level = Math.min(Math.max(block.level, 2), 6);
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag
          key={key}
          id={block.id}
          className="mt-4 scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-fd-muted-foreground first:mt-0"
        >
          {renderInline(block.text, key)}
        </Tag>
      );
    }

    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={key} className={`mt-2 space-y-1 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
          {block.items.map((item, i) => (
            <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={key} className="mt-2 first:mt-0">
        {renderInline(block.text, key)}
      </p>
    );
  });
}
