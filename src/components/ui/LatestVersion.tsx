'use client';

import { useEffect, useState } from 'react';

export default function LatestVersion({
  owner = 'blueprintframework',
  repo = 'hydrodactyl',
  fallback = 'unknown',
}: {
  owner?: string;
  repo?: string;
  fallback?: string;
}) {
  const [version, setVersion] = useState('loading...');

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API request failed with status ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (typeof data?.tag_name === 'string' && data.tag_name) {
          setVersion(data.tag_name);
        } else {
          setVersion(fallback);
        }
      })
      .catch(() => {
        setVersion(fallback);
      });

    return () => {
      controller.abort();
    };
  }, [fallback, owner, repo]);

  return <span>{version}</span>;
}
