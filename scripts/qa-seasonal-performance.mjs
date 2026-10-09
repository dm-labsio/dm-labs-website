/** Paired, cold-cache lab comparison, not a promise about real-user Core Web Vitals.
 * Usage: node scripts/qa-seasonal-performance.mjs BASELINE_PUBLIC CANDIDATE_PUBLIC [OUTPUT]
 * Both artifacts use identical gzip static servers, browser, CPU and network conditions.
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";

const [baseline, candidate, out = "/private/tmp/dm-halloween-performance"] =
  process.argv.slice(2);
assert(
  baseline && candidate,
  "Provide baseline and candidate public build folders"
);
await mkdir(out, { recursive: true });
const types = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".png": "image/png",
  ".mp4": "video/mp4",
};
async function serve(folder) {
  const root = resolve(folder);
  const server = createServer(async (req, res) => {
    try {
      const path = new URL(req.url, "http://localhost").pathname;
      if (path === "/api/visitor-currency/") {
        res.setHeader("Content-Type", "application/json");
        res.end('{"currency":"EUR"}');
        return;
      }
      let file = resolve(root, "." + decodeURIComponent(path));
      if (!file.startsWith(root + sep) && file !== root) {
        res.writeHead(403);
        res.end();
        return;
      }
      if ((await stat(file)).isDirectory()) file += "/index.html";
      let bytes = await readFile(file);
      const ext = extname(file);
      res.setHeader("Content-Type", types[ext] || "application/octet-stream");
      if ([".html", ".js", ".css", ".json", ".svg"].includes(ext)) {
        bytes = gzipSync(bytes);
        res.setHeader("Content-Encoding", "gzip");
      }
      res.setHeader("Content-Length", bytes.length);
      res.end(bytes);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}
const fixtures = {
  baseline: await serve(baseline),
  halloween: await serve(candidate),
};
const browser = await chromium.launch();
const results = [];
try {
  for (const device of ["desktop", "mobile"])
    for (let run = 0; run < 3; run++)
      for (const version of run % 2
        ? ["halloween", "baseline"]
        : ["baseline", "halloween"]) {
        const context = await browser.newContext({
          viewport:
            device === "mobile"
              ? { width: 390, height: 844 }
              : { width: 1440, height: 1000 },
          deviceScaleFactor: device === "mobile" ? 2 : 1,
        });
        const page = await context.newPage();
        await page.addInitScript(() => {
          // Pin only the campaign decision. Do not mock performance/timers in a benchmark.
          Date.now = () => Date.parse("2026-10-15T12:00:00Z");
          localStorage.setItem(
            "dm_cookie_consent",
            '{"essential":true,"analytics":false}'
          );
          window.__perf = { lcp: 0, cls: 0, blocking: 0, longTasks: 0 };
          new PerformanceObserver(list => {
            for (const e of list.getEntries()) {
              window.__perf.lcp = e.startTime;
              window.__perf.lcpElement =
                e.element?.className || e.element?.tagName;
            }
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver(list => {
            for (const e of list.getEntries())
              if (!e.hadRecentInput) window.__perf.cls += e.value;
          }).observe({ type: "layout-shift", buffered: true });
          new PerformanceObserver(list => {
            for (const e of list.getEntries()) {
              window.__perf.blocking += Math.max(0, e.duration - 50);
              window.__perf.longTasks++;
            }
          }).observe({ type: "longtask", buffered: true });
        });
        // Both builds use the same explicit no-consent fixture. Block unrelated remote integrations.
        await context.route("**/*", route =>
          route.request().url().startsWith(fixtures[version].url)
            ? route.continue()
            : route.abort()
        );
        const cdp = await context.newCDPSession(page);
        await cdp.send("Network.enable");
        await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
        await cdp.send("Emulation.setCPUThrottlingRate", {
          rate: device === "mobile" ? 4 : 1,
        });
        await cdp.send("Network.emulateNetworkConditions", {
          offline: false,
          latency: device === "mobile" ? 150 : 40,
          downloadThroughput:
            ((device === "mobile" ? 1.6 : 10) * 1024 * 1024) / 8,
          uploadThroughput: (750 * 1024) / 8,
        });
        let bytes = 0;
        cdp.on("Network.loadingFinished", e => {
          bytes += e.encodedDataLength;
        });
        await page.goto(fixtures[version].url, {
          waitUntil: "load",
          timeout: 60000,
        });
        if (version === "halloween")
          await page.locator(".seasonal-layer").waitFor();
        await page.waitForTimeout(5500);
        const result = await page.evaluate(() => ({
          ...window.__perf,
          resources: performance.getEntriesByType("resource").length,
        }));
        result.bytes = bytes;
        result.device = device;
        result.version = version;
        result.run = run;
        results.push(result);
        console.log(JSON.stringify(result));
        await context.close();
      }
  const median = arr =>
    [...arr].sort((a, b) => a - b)[Math.floor(arr.length / 2)];
  const summary = {};
  for (const device of ["desktop", "mobile"]) {
    summary[device] = {};
    for (const version of ["baseline", "halloween"]) {
      const rows = results.filter(
        r => r.device === device && r.version === version
      );
      summary[device][version] = Object.fromEntries(
        ["lcp", "cls", "blocking", "bytes"].map(key => [
          key,
          +median(rows.map(r => r[key])).toFixed(2),
        ])
      );
    }
    const b = summary[device].baseline,
      h = summary[device].halloween;
    summary[device].budget = {
      lcp: h.lcp <= b.lcp * 1.1 + 150,
      cls: h.cls <= b.cls + 0.01,
      blocking: h.blocking <= b.blocking * 1.15 + 100,
      transfer: h.bytes <= b.bytes + 90000,
    };
  }
  await writeFile(
    `${out}/report.json`,
    JSON.stringify(
      {
        conditions:
          "3 paired cold-cache runs/device; desktop 10Mbps/40ms/1x CPU, mobile 1.6Mbps/150ms/4x CPU; gzip; no analytics consent",
        summary,
        results,
      },
      null,
      2
    )
  );
  console.log(JSON.stringify(summary, null, 2));
  assert(
    Object.values(summary).every(s => Object.values(s.budget).every(Boolean)),
    "Performance regression budget exceeded; inspect the saved report"
  );
} finally {
  await browser.close();
  for (const fixture of Object.values(fixtures))
    await new Promise(r => fixture.server.close(r));
}
