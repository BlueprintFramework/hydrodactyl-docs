import { fetchAllReleases } from '@/lib/github-releases';
import ChangelogList from './changelog/ChangelogList';

export default async function Changelog() {
  const releases = await fetchAllReleases();
  return <ChangelogList releases={releases} />;
}
