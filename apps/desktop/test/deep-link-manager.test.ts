import { describe, expect, it } from 'vitest';
import { deepLinkToRoute } from '../src/main/deep-link-manager.js';

describe('Desktop deep-link validation', () => {
  it('returns to the account page with an order ID but never trusts payment claims', () => {
    expect(deepLinkToRoute('videocreator://billing/return')).toBe('#/account?billing=return');
    expect(deepLinkToRoute('videocreator://billing/return?orderId=order-1')).toBe('#/account?billing=return&orderId=order-1');
    for (const value of ['videocreator://billing/return?orderId=', 'videocreator://billing/return?orderId=order%2F1', 'videocreator://billing/return?paid=true', 'videocreator://billing/return#paid', 'videocreator://billing/return/extra']) expect(deepLinkToRoute(value), value).toBeUndefined();
  });
  it('opens the account page for the fixed authorization callback without accepting credentials', () => {
    expect(deepLinkToRoute('videocreator://auth/complete')).toBe('#/account?login=complete');
    for (const value of [
      'videocreator://auth/complete?token=secret',
      'videocreator://auth/complete#secret',
      'videocreator://user@auth/complete',
      'videocreator://auth:80/complete',
      'videocreator://auth/complete/extra'
    ]) expect(deepLinkToRoute(value), value).toBeUndefined();
  });
  it('rejects any malformed path or query encoding as one invalid link', () => {
    for (const value of [
      'videocreator://thread/%',
      'videocreator://thread/%E0%A4%A',
      'videocreator://thread/ok?runId=%',
      'videocreator://thread/ok?unused=%E0%A4%A',
      'videocreator://thread/%00hidden',
      'videocreator://thread/%EF%BF%BD'
    ]) {
      expect(deepLinkToRoute(value), value).toBeUndefined();
    }
  });

  it('accepts valid Unicode, spaces, and encoded slashes', () => {
    expect(deepLinkToRoute(
      'videocreator://thread/thread%2F%E4%B8%AD%E6%96%87?runId=run+one'
    )).toBe(
      '#/thread/thread%2F%E4%B8%AD%E6%96%87?runId=run+one'
    );
  });

  it('rejects empty and overlong UTF-8 identifiers', () => {
    expect(deepLinkToRoute('videocreator://thread/ok?runId=')).toBeUndefined();
    expect(deepLinkToRoute(
      `videocreator://thread/${encodeURIComponent('中'.repeat(200))}`
    )).toBeUndefined();
  });
});
