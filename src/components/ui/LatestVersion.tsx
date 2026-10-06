import { fetchLatestVersion } from '@/lib/github-releases';

export default async function LatestVersion({
  owner = 'blueprintframework',
  repo = 'hydrodactyl',
  fallback = 'unknown',
}: {
  owner?: string;
  repo?: string;
  fallback?: string;
}) {
  const version = await fetchLatestVersion(owner, repo);

  return <span>{version ?? fallback}</span>;
}
