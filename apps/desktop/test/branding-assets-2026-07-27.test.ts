import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import sharp from 'sharp';

describe('videoCreator VN identity', () => {
  it.each([['icon.png', 1024], ['icon-win.png', 256], ['tray.png', 64]] as const)(
    'ships a visible white-on-black %s at the required size', async (name, size) => {
      const {data, info} = await sharp(resolve('resources', name)).removeAlpha().raw().toBuffer({resolveWithObject: true});
      expect([info.width, info.height]).toEqual([size, size]);
      expect([...data.subarray(0, 3)]).toEqual([0, 0, 0]);
      let white = 0;
      for (let i = 0; i < data.length; i += 3) if (data[i]! > 240 && data[i + 1]! > 240 && data[i + 2]! > 240) white++;
      expect(white / (size * size)).toBeGreaterThan(0.1);
      expect(white / (size * size)).toBeLessThan(0.5);
    }
  );
  it('identifies the product and its customization author in bootstrap and package metadata', () => {
    const html = readFileSync('src/bootstrap/index.html', 'utf8');
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    expect(html).toContain('alt="VN"');
    expect(html).toContain('Nguyễn Thành Công');
    expect(pkg.author).toBe('Nguyễn Thành Công');
    expect(pkg.description).toContain('videoCreator');
  });
});
