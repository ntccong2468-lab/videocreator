import { describe, expect, it } from 'vitest';
import { normalizeVideoSourceUrl, supportedVideoSourcePlatform } from '../src/creator-download.js';
import { videoSourceIdentity } from '../src/video-metadata.js';
const international = 'https://www.bilibili.tv/en/video/4801343148661760?bstar_from=bstar-web.homepage.recommend.all';
describe('extractor-based video sources', () => {
 it.each([international, 'https://www.tiktok.com/player/v1/123456789', 'https://www.facebook.com/share/v/abc123/', 'https://www.instagram.com/share/reel/abc123/', 'https://vimeo.com/12345678', 'https://cdn.example.org/media/video.mkv?signature=sample%2Bvalue', 'http://cdn.example.org/video.m3u8'])('accepts a public source without a fixed platform allowlist: %s', url => {
  expect(supportedVideoSourcePlatform(url)).toBe('generic');
  expect(normalizeVideoSourceUrl(url)).toBe(url);
  expect(videoSourceIdentity(url)).not.toBeNull();
 });
 it.each(['file:///tmp/video.mp4', 'javascript:alert(1)', 'https://localhost/a.mp4', 'http://127.0.0.1/a', 'http://169.254.169.254/a', 'https://10.0.0.1/a', 'https://[::1]/a', 'https://user:secret@example.org/video'])('does not delegate an unsafe source: %s', url => {
  expect(supportedVideoSourcePlatform(url)).toBeNull();
 });
 it('keeps different signed links separate and recognizes canonical Bilibili China videos', () => {
  expect(videoSourceIdentity(international)).not.toBe(videoSourceIdentity(international.replace('4801343148661760', '4801343148661761')));
  expect(supportedVideoSourcePlatform('https://www.bilibili.com/video/BV18E421w7bf?p=2')).toBe('bilibili');
 });
});
