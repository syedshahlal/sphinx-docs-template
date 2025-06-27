import fs from 'fs/promises';
import path from 'path';
import { type NavItem } from './docs-navigation';

const docsRoot = path.join(process.cwd(), 'docs');

// Converts a filename like 'api-reference' or 'platform-overview' to 'API Reference' or 'Platform Overview'
function formatTitle(name: string): string {
  return name
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateNavFromFileSystem(version: string): Promise<NavItem[]> {
  const versionPath = path.join(docsRoot, version);

  async function readDir(currentPath: string): Promise<NavItem[]> {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      const navItems: NavItem[] = [];

      for (const entry of entries) {
        const entryPath = path.join(currentPath, entry.name);
        const baseName = path.basename(entry.name, path.extname(entry.name));
        
        // Skip config files, hidden files, or other non-content files
        if (entry.name.startsWith('conf') || entry.name.startsWith('.')) {
            continue;
        }

        // Don't create a nav item for the index file itself, it's used for the parent link
        if (baseName === 'index') {
            continue;
        }

        if (entry.isDirectory()) {
          const children = await readDir(entryPath);
          // The link for a directory points to its path. If an index file exists, it will be served.
          const dirHref = `/docs/${version}/${path.relative(versionPath, entryPath).replace(/\\/g, '/')}`;
          
          const hasIndex = (await fs.readdir(entryPath)).some(f => f.startsWith('index.'));
          // Only add the directory to nav if it contains child pages or an index page.
          if (children.length > 0 || hasIndex) {
             navItems.push({
                title: formatTitle(entry.name),
                href: dirHref,
                items: children,
             });
          }
        } else if (entry.isFile() && (entry.name.endsWith('.rst') || entry.name.endsWith('.md'))) {
          const href = `/docs/${version}/${path.relative(versionPath, entryPath).replace(/\\/g, '/').replace(/\.(rst|md)$/, '')}`;
          navItems.push({
            title: formatTitle(baseName),
            href,
          });
        }
      }
      // Sort items alphabetically, with directories appearing before files if desired (current is pure alpha)
      return navItems.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      // If a directory for the version doesn't exist, return an empty array.
      if (error.code === 'ENOENT') {
        console.warn(`Directory not found: ${currentPath}`);
        return [];
      }
      throw error;
    }
  }

  return await readDir(versionPath);
}
