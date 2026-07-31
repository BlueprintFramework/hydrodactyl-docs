'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

const PAGE_SIZE = 10;                           // this defines how many releases will be loaded at once
const RELEASES_URL =
  'https://api.github.com/repos/blueprintframework/hydrodactyl/releases'; //should be clear what this is

type ReleaseSummary = {
  tagName: string;
  publishedAt: string | null;
  body: string;
};

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'paragraph'; text: string };

function parseVersion(tagName: string) {         //function to parse the version number
  return tagName
    .replace(/^v/i, '')                          //remove the 'v' in front
    .split(/[.-]/)                               //split the version number (1.1.1 to 1 1 1)
    .slice(0, 3)                                 //only use the top three numbers ('1 1 1 beta' to '1 1 1')
    .map((p) => parseInt(p, 10) || 0);
} 

function isV6AndLater(tagName: string) {         //sort out versions lower than 6.0.0 (if you go that far w/ pagination)
  const [major = 0] = parseVersion(tagName);
  return major >= 6;
}

function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const lines = body.split(/\r?\n/);            //split text on newline

  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {                //save the paragraph and flush buffer
    if (paragraphLines.length) {
      blocks.push({
        type: 'paragraph',
        text: paragraphLines.join(' '),
      });
      paragraphLines = [];
    }
  };

  const flushList = () => {                      //save the list and flush buffer
    if (listItems.length) {
      blocks.push({
        type: 'list',
        ordered: listOrdered,
        items: listItems,
      });

      listItems = [];
      listOrdered = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();                 //remove empty spaces or wtv these are called ' '

    /*
    *An empty line marks the end of a paragraph/list!
    */
    if (!line) {                                 //check if the line is empty
      flushParagraph();
      flushList();
      continue;
    }                                            //save the paragraph/list, done.

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/); //check if the line is a heading (starts with #)

    if (headingMatch) {
      flushParagraph();
      flushList();                              //save preceded paragraphs/lists

      blocks.push({                             //save the heading
        type: 'heading',
        level: headingMatch[1].length,          //aka 1 - 6 #
        text: headingMatch[2].trim(),           //aka the content of the heading
      });

      continue;
    }

    const bulletMatch = line.match(/^[-*+]\s+(.*)$/);   //detect markdown lists with -, * and + (unordered)
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);  //detect numeric lists (ordered)

    if (bulletMatch || orderedMatch) {
      flushParagraph();                          //save preceded paragraphs

      if (!listItems.length) {
        listOrdered = Boolean(orderedMatch);     //remember if the list is ordered or unordered (via the first item)
      }

      listItems.push((bulletMatch ?? orderedMatch)![1].trim()); /*
                                                                *1. Take bulletMatch if existing, else take orderedMatch
                                                                *2. Take the content of the list item
                                                                *3. Remove empty spaces at the start and end
                                                                */

      continue;
    }

    flushList();                                /*if the line is none of the previous cases:
                                                *- Save any potential lists and*/
    paragraphLines.push(line);                  //- Add the line to the current paragraph buffer
  }

  flushParagraph();                             //obviously still have to save the paragraph/list if nothing special happened and they are not ended through an empty line
  flushList();

  return blocks;
}

function linkProps(href: string) {              //helper to display and open links properly
  return {
    href,
    target: '_blank' as const,
    rel: 'noreferrer noopener',
    className: 'text-fd-accent hover:underline break-all',
  };
}

function shortenRepoReference(url: string): string | null { //helper to display long links as simple issue or PR hashtags, as you're used to from Github
  const match = url.match(
    /^https?:\/\/github\.com\/BlueprintFramework\/hydrodactyl\/(?:pull|issues)\/(\d+)(?:\/.*)?(?:[?#].*)?$/i
  );

  return match ? `#${match[1]}` : null;
}

function linkLabel(url: string, explicitLabel?: string) { //helper to display links
  if (explicitLabel && explicitLabel !== url) {
    return explicitLabel;
  }

  return shortenRepoReference(url) ?? explicitLabel ?? url;
}

function splitTrailingPunctuation(url: string) {  //helper to decide between the actual link and trailing punctuation (a '.' after the link)
  const match = url.match(/^(.*?)([.,;:!?)\]}>]+)$/);

  if (!match) {
    return { url, trailing: '' };                 //if no trailing was found, return the url back and obv an empty trailing
  }

  let cleaned = match[1];
  let trailing = match[2];

  while (trailing.startsWith(')') && cleaned.includes('(')) { //keep balanced trailing ) if an opening ( exists in the URL
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


//==========================================MARKDOWN RENDERER=====================================================================
function renderInline(
  text: string,
  keyPrefix: string
): ReactNode[] {
  const nodes: ReactNode[] = [];

  const regex =
    //searching for a bunch of stuff that matters for inline rendering
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
        <a
          key={`${keyPrefix}-${i++}`}
          {...linkProps(match[2])}
        >
          {linkLabel(match[2], match[1])}
        </a>
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`${keyPrefix}-${i++}`}>
          {match[3]}
        </strong>
      );
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
      nodes.push(
        <em key={`${keyPrefix}-${i++}`}>
          {match[5]}
        </em>
      );
    } else if (match[0].startsWith('@')) {
      const username = match[0].slice(1).replace(/\[bot\]$/i, '');

      nodes.push(
        <a
          key={`${keyPrefix}-${i++}`}
          {...linkProps(`https://github.com/${username}`)}
        >
          {match[0]}
        </a>
      );
    } else if (match[6]) {
      const { url, trailing } = splitTrailingPunctuation(match[6]);

      nodes.push(
        <a
          key={`${keyPrefix}-${i++}`}
          {...linkProps(url)}
        >
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

function renderBlocks(blocks: Block[]): ReactNode {
  return blocks.map((block, index) => {
    const key = `block-${index}`;

    if (block.type === 'heading') {
      return (
        <p
          key={key}
          className="mt-4 text-sm font-semibold uppercase tracking-wide text-fd-muted-foreground first:mt-0"
        >
          {renderInline(block.text, key)}
        </p>
      );
    }

    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';

      return (
        <ListTag
          key={key}
          className={`mt-2 space-y-1 pl-5 ${
            block.ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {block.items.map((item, i) => (
            <li key={`${key}-${i}`}>
              {renderInline(item, `${key}-${i}`)}
            </li>
          ))}
        </ListTag>
      );
    }

    return (
      <p
        key={key}
        className="mt-2 first:mt-0"
      >
        {renderInline(block.text, key)}
      </p>
    );
  });
}
//==========================================END OF MARKDOWN RENDERER=====================================================================

function mapReleases(
  data: Array<Record<string, any>>
): ReleaseSummary[] {
  return data
    .filter(
      (release) => typeof release.tag_name === 'string'  //only using valid tag names
    )
    .filter((release) => isV6AndLater(release.tag_name)) //only using releases above v6.0.0
    .map((release) => ({
      tagName: release.tag_name,
      publishedAt: release.published_at ?? null,
      body: release.body ?? '',                          //mapping GitHub's values to proper standardized values
    }))
    .sort((a, b) => {                                    //sort releases by date
      const aDate = a.publishedAt
        ? Date.parse(a.publishedAt)
        : 0;

      const bDate = b.publishedAt
        ? Date.parse(b.publishedAt)
        : 0;

      return bDate - aDate;
    });
}

export default function Changelog() {
  const [releases, setReleases] = useState<ReleaseSummary[]>([]); //save all loaded releases
  const [page, setPage] = useState(1);                    //check which GitHub page is being loaded
  const [hasMore, setHasMore] = useState(false);          //decide if the pages button should be displayed
  const [status, setStatus] =
    useState<'idle' | 'loading' | 'loading-more' | 'error'>('idle'); //different cases

  const fetchPage = useCallback(async (nextPage: number, append: boolean) => { //fetching the page from github
    setStatus(append ? 'loading-more' : 'loading');

    const res = await fetch(
      `${RELEASES_URL}?per_page=${PAGE_SIZE}&page=${nextPage}`, //API request
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);   //resolve errors
    }

    const data: Array<Record<string, any>> = await res.json(); //save the data
    const parsed = mapReleases(data);                          //map the releases (surprise)

    setReleases((prev) => (append ? [...prev, ...parsed] : parsed)); //save the releases in proper order
    setPage(nextPage);
    setHasMore(data.length === PAGE_SIZE);
    setStatus('idle');
  }, []);

  useEffect(() => {
    let active = true;

    fetchPage(1, false).catch(() => {                          //initial page fetching
      if (!active) return;
      setStatus('error');
    });

    return () => {
      active = false;
    };
  }, [fetchPage]);

  const loadMore = () => {                                     //this is the "Load More" button at the bottom
    if (status !== 'idle' || !hasMore) return;

    fetchPage(page + 1, true).catch(() => {
      setStatus('error');
    });
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">
          Hydrodactyl Release Notes (v6+)
        </h2>

        <p className="max-w-3xl text-sm text-fd-muted-foreground">
          View our latest releases!
        </p>
      </div>

      {status === 'loading' ? (
        <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 text-sm text-fd-muted-foreground">
          Fetching data...
        </div>
      ) : status === 'error' && !releases.length ? (
        <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 text-sm">
          Failed to load release notes.
        </div>
      ) : (
        <div className="space-y-6">
          {releases.map((release) => (                        //one article for each release
            <article
              key={release.tagName}
              className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6"
            >
              <div>
                <p className="text-sm text-fd-muted-foreground">
                  {release.publishedAt
                    ? new Date(
                        release.publishedAt
                      ).toLocaleDateString()
                    : 'Unknown date'}
                </p>

                <h3 className="text-xl font-semibold">
                  {release.tagName}
                </h3>
              </div>

              <div className="mt-6 text-sm leading-6 text-fd-foreground">
                {release.body ? (
                  renderBlocks(                                //all the markdown stuff
                    parseBlocks(release.body)
                  )
                ) : (
                  <p className="text-sm text-fd-muted-foreground">
                    No details available.
                  </p>
                )}
              </div>
            </article>
          ))}

          {!releases.length && status === 'idle' ? (
            <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 text-sm text-fd-muted-foreground">
              Error: No releases found.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {hasMore ? (
              <button
                type="button"
                onClick={loadMore}
                disabled={status === 'loading-more'}
                className="inline-flex items-center justify-center rounded-2xl border border-fd-border bg-fd-app-bg/80 px-4 py-3 text-sm font-medium transition hover:bg-fd-muted/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading-more'
                  ? 'Loading more releases...'
                  : 'Load 10 more releases'}
              </button>
            ) : null}

            <Link
              href="/docs/hydrodactyl/changelog/v5" //this is to load the older releases pre v6.0.0. They were allready hardcoded beforehand, so we're just linking them here for documenation purposes.
              className="inline-flex items-center justify-center rounded-2xl border border-fd-border bg-fd-app-bg/80 px-4 py-3 text-sm font-medium transition hover:bg-fd-muted/40"
            >
              Older releases (before v6)
            </Link>
          </div>

          {status === 'error' ? (
            <p className="text-sm text-fd-muted-foreground">
              Failed to load more releases.
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
