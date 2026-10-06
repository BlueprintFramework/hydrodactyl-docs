const OWNER = 'blueprintframework';
const REPO = 'hydrodactyl';

const BUILD_TOKEN = `${Date.now()}-${process.pid}`;

export type ReleaseSummary = {
  tagName: string;
  publishedAt: string | null;
  body: string;
};

function parseVersion(tagName: string) {
  return tagName
    .replace(/^v/i, '')
    .split(/[.-]/)
    .slice(0, 3)
    .map((p) => parseInt(p, 10) || 0);
}

function isV6AndLater(tagName: string) {
  const [major = 0] = parseVersion(tagName);
  return major >= 6;
}

function mapReleases(data: Array<Record<string, any>>): ReleaseSummary[] {
  return data
    .filter((release) => typeof release.tag_name === 'string')
    .filter((release) => isV6AndLater(release.tag_name))
    .map((release) => ({
      tagName: release.tag_name,
      publishedAt: release.published_at ?? null,
      body: release.body ?? '',
    }));
}

async function githubApi<T>(
  owner: string,
  repo: string,
  path: string
): Promise<T> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}${path}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Fetches every release page-by-page until GitHub returns a short page
// (i.e. we've hit the end). This only ever runs during `next build`,
// on your CI runner — never in a visitor's browser.
export async function fetchAllReleases(): Promise<ReleaseSummary[]> {
  const all: ReleaseSummary[] = [];
  let page = 1;
  const perPage = 100; // max GitHub allows per page, minimizes request count

  while (true) {
    const data = await githubApi<Array<Record<string, any>>>(
      OWNER,
      REPO,
      `/releases?per_page=${perPage}&page=${page}&build=${BUILD_TOKEN}`
    );

    all.push(...mapReleases(data));

    if (data.length < perPage) break;
    page += 1;
  }

  return all.sort((a, b) => {
    const aDate = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bDate = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bDate - aDate;
  });
}

export async function fetchLatestVersion(
  owner = OWNER,
  repo = REPO
): Promise<string | null> {
  try {
    const data = await githubApi<Record<string, any>>(
      owner,
      repo,
      `/releases/latest?build=${BUILD_TOKEN}`
    );

    return typeof data?.tag_name === 'string' && data.tag_name
      ? data.tag_name
      : null;
  } catch {
    return null;
  }
}
