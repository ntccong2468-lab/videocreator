import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function verifyRelease(directory, expectedCommit, version) {
  const files = [];
  function walk(root) { for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name); if (entry.isDirectory()) walk(path); else files.push(path);
  }}
  walk(directory);
  const one = name => { const matches = files.filter(file => basename(file) === name);
    if (matches.length !== 1) throw new Error(`Expected exactly one ${name}`); return matches[0]; };
  const manifest = JSON.parse(readFileSync(one('opencreator-desktop-build-manifest.json'), 'utf8'));
  if (manifest.commit !== expectedCommit || manifest.platform !== 'win32' || manifest.arch !== 'x64') throw new Error('Build provenance mismatch');
  if (manifest.krillinCliVersion !== version) throw new Error('Build version mismatch');
  const installerName = `videoCreator-${version}-win-x64.exe`;
  const record = manifest.artifacts.find(item => item.path.replaceAll('\\', '/').split('/').at(-1) === installerName);
  if (!record) throw new Error('Installer missing from build manifest');
  const installer = one(installerName);
  const component = manifest.remotionComponent;
  if (!component || component.componentVersion !== version || !component.fileName.startsWith(`Remotion-${version}-`)) throw new Error('Rendering component version mismatch');
  const rendering = one(component.fileName);
  const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
  if (hash(installer) !== record.sha256 || hash(rendering) !== component.archiveSha256) throw new Error('Release asset checksum mismatch');
  return { installer, rendering, checksums: `${hash(installer)}  ${basename(installer)}\n${hash(rendering)}  ${basename(rendering)}\n` };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [directory, expectedCommit, version] = process.argv.slice(2);
  if (!directory || !/^[a-f0-9]{40}$/.test(expectedCommit ?? '') || !/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(version ?? '')) throw new Error('Invalid release arguments');
  const result = verifyRelease(directory, expectedCommit, version);
  writeFileSync(join(directory, 'SHA256SUMS.txt'), result.checksums);
  console.log('Installer, rendering component and build provenance verified.');
}
