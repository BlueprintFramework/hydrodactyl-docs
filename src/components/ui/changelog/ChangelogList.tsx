'use client';

import Link from 'next/link';
import { useState } from 'react';
import { parseBlocks, renderBlocks } from './markdown';
import type { ReleaseSummary } from '@/lib/github-releases';


export default function ChangelogList({ releases }: { releases: ReleaseSummary[] }) {

  const visible = releases;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Hydrodactyl Release Notes (v6+)</h2>
        <p className="max-w-3xl text-sm text-fd-muted-foreground">View our latest releases!</p>
      </div>

      {visible.length ? (
        <div className="space-y-6">
          {visible.map((release) => (
            <article key={release.tagName} className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6">
              <div>
                <p className="text-sm text-fd-muted-foreground">
                  {release.publishedAt ? new Date(release.publishedAt).toLocaleDateString() : 'Unknown date'}
                </p>
                <h3 className="text-xl font-semibold">{release.tagName}</h3>
              </div>

              <div className="mt-6 text-sm leading-6 text-fd-foreground">
                {release.body ? (
                  renderBlocks(parseBlocks(release.body))
                ) : (
                  <p className="text-sm text-fd-muted-foreground">No details available.</p>
                )}
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/docs/hydrodactyl/changelog/v5"
              className="inline-flex items-center justify-center rounded-2xl border border-fd-border bg-fd-app-bg/80 px-4 py-3 text-sm font-medium transition hover:bg-fd-muted/40"
            >
              Older releases (before v6)
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-fd-border bg-fd-app-bg/80 p-6 text-sm text-fd-muted-foreground">
          No releases found.
        </div>
      )
      }
    </section >
  );
}
