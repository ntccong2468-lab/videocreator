import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifyRelease } from './verify-videocreator-release.mjs';
test('release validation rejects tampered assets and mismatched build provenance', () => {
 const root=mkdtempSync(join(tmpdir(),'vn-release-'));
 const hash=s=>createHash('sha256').update(s).digest('hex');
 const version='3.2.9-vn.1', commit='a'.repeat(40);
 const name=`videoCreator-${version}-win-x64.exe`, component=`Remotion-${version}-win32-x64.tar.gz`;
 try {
  writeFileSync(join(root,name),'installer');writeFileSync(join(root,component),'renderer');
  writeFileSync(join(root,'opencreator-desktop-build-manifest.json'),JSON.stringify({commit,platform:'win32',arch:'x64',krillinCliVersion:version,artifacts:[{path:`D:\\build\\${name}`,sha256:hash('installer')}],remotionComponent:{componentVersion:version,fileName:component,archiveSha256:hash('renderer')}}));
  assert.match(verifyRelease(root,commit,version).checksums,/videoCreator/);
  assert.throws(()=>verifyRelease(root,'b'.repeat(40),version),/provenance/);
  writeFileSync(join(root,name),'tampered');
  assert.throws(()=>verifyRelease(root,commit,version),/checksum/);
 } finally {rmSync(root,{recursive:true,force:true});}
});
