import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(resolve(root, 'client/public/previews/bella-salon.html'), 'utf8');

describe('Bella editorial concept preview', () => {
  it('stays a non-indexed fictional example without real booking or contact claims', () => {
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).toContain('A fictional salon concept by DM Labs. No real bookings.');
    expect(html).not.toMatch(/Award-Winning|2,400\+|tel:|mailto:|rel="canonical"/);
    expect(html).toContain('event.preventDefault();');
    expect(html).toContain('This preview hasn’t made a booking.');
  });
  it('uses a locally hosted campaign image and one semantic page heading', () => {
    expect(existsSync(resolve(root, 'client/public/media/bella-editorial-portrait.webp'))).toBe(true);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain('fetchpriority="high"');
  });
  it('provides motion controls, reduced-motion support, and progressive enhancement', () => {
    expect(html).toContain('prefers-reduced-motion: reduce');
    expect(html).toContain('Pause decorative motion');
    expect(html).toContain("toggle.setAttribute('aria-pressed', String(paused))");
    expect(html).toContain("root.classList.add('reveal-ready')");
  });
  it('keeps navigation within the single page without pushing history', () => {
    for (const id of ['main', 'rituals', 'studio', 'your-moment']) expect(html).toContain(`id="${id}"`);
    expect(html).not.toContain('history.pushState');
    expect(html).toContain('event.stopImmediatePropagation();');
    expect(html).toContain('aria-labelledby="booking-title"');
  });
});
