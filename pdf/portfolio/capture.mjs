// Screenshot the live sites for the portfolio PDF.
// Usage: node capture.mjs <job> [<job> ...]   (jobs: basrh, harinesia, quiz, quizlocal, hbp, clients)
// Analytics and form endpoints are blocked so these headless visits don't count as real traffic.
import { chromium } from "file:///D:/Work-or-ticket/quiz/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(path.dirname(new URL(import.meta.url).pathname).replace(/^\/(\w:)/, "$1"), "shots");
fs.mkdirSync(OUT, { recursive: true });
const BLOCK = /umami|googletagmanager|google-analytics|analytics\.google|doubleclick|facebook\.net|connect\.facebook|script\.google\.com|hotjar|clarity\.ms|vercel-insights|_vercel\/insights/i;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const DESK = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const MOB = {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
};

let browser;
async function ctx(kind) {
  const c = await browser.newContext({ ...(kind === "m" ? MOB : DESK), locale: "en-US", reducedMotion: "no-preference" });
  await c.route("**/*", (r) => (BLOCK.test(r.request().url()) ? r.abort() : r.continue()));
  return c;
}
async function shot(page, name, opts = {}) {
  const file = path.join(OUT, name + ".png");
  await page.screenshot({ path: file, ...opts });
  console.log("saved", name);
}
async function settle(page, ms = 1500) {
  try { await page.waitForLoadState("networkidle", { timeout: 15000 }); } catch {}
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await wait(ms);
}
// scroll through the page so lazy images and reveal animations fire, then return to top
async function warm(page) {
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await wait(800);
}
async function hideCss(page, css) { await page.addStyleTag({ content: css }); }
// Harinesia: show the counter-off state the site itself renders when produk.json "terjual" is empty
async function noCounter(page) {
  await page.addStyleTag({ content: ".slot{display:none!important}" });
  await page.evaluate(() => document.querySelectorAll(".buybar-name").forEach((e) => (e.textContent = "Promo 100 pembeli pertama")));
}

const jobs = {
  // ---------- basrh.com: slide deck site ----------
  async basrh() {
    for (const kind of ["d", "m"]) {
      const c = await ctx(kind); const p = await c.newPage();
      await p.goto("https://www.basrh.com/", { waitUntil: "domcontentloaded" });
      await settle(p, 3500);
      const hideCursor = "#cur,#ring{display:none!important}";
      await hideCss(p, hideCursor);
      for (let i = 1; i <= 8; i++) {
        if (i > 1) { await p.keyboard.press("ArrowRight"); await wait(3200); }
        if (i === 5) {
          await shot(p, `basrh-${kind}-s5-front`);
          if (kind === "d") {
            // flip every card to show the back faces
            const n = await p.locator(".cards .card").count();
            for (let k = 0; k < n; k++) { await p.locator(".cards .card").nth(k).focus(); await p.keyboard.press("Enter"); await wait(1300); }
            await p.evaluate(() => document.activeElement && document.activeElement.blur());
            await wait(1500);
            await shot(p, `basrh-d-s5-back`);
            await p.locator(".cards .card").first().locator(".blist").click({ force: true });
            await wait(1500);
            await shot(p, `basrh-d-s5-back-list`);
            for (let k = 0; k < n; k++) { await p.locator(".cards .card").nth(k).focus(); await p.keyboard.press("Escape"); await wait(400); }
            await p.evaluate(() => document.activeElement && document.activeElement.blur());
            await wait(1200);
          } else {
            await p.locator(".cards .card").first().focus(); await p.keyboard.press("Enter"); await wait(1800);
            await p.evaluate(() => document.activeElement && document.activeElement.blur());
            await shot(p, `basrh-m-s5-open`);
            await p.locator(".cards .card").first().focus(); await p.keyboard.press("Escape"); await wait(1200);
          }
        } else {
          await shot(p, `basrh-${kind}-s${i}`);
        }
      }
      await c.close();
    }
  },

  // ---------- Harinesia ----------
  async harinesia() {
    const hide = ".slot{display:none!important}"; // manual "sold X of 100" counter: not real sales data, kept out of the portfolio
    for (const kind of ["d", "m"]) {
      const c = await ctx(kind); const p = await c.newPage();
      await p.goto("https://harinesia.id/panduan/", { waitUntil: "domcontentloaded" });
      await settle(p, 2500); await noCounter(p);
      await shot(p, `har-${kind}-panduan-hero`);
      await warm(p);
      for (const id of ["tebak", "contoh", "testimoni", "resep", "isi", "kurikulum", "harga", "faq"]) {
        const el = p.locator("#" + id);
        if (!(await el.count())) continue;
        await el.scrollIntoViewIfNeeded(); await p.evaluate((i) => document.getElementById(i).scrollIntoView({ block: "start" }), id);
        await wait(1400);
        await shot(p, `har-${kind}-panduan-${id}`);
      }
      if (kind === "d") await shot(p, `har-d-panduan-full`, { fullPage: true });
      await c.close();
      // survey card (?survei shows it without counting)
      const c2 = await ctx(kind); const p2 = await c2.newPage();
      await p2.goto("https://harinesia.id/panduan/?survei", { waitUntil: "domcontentloaded" });
      await settle(p2, 2500); await noCounter(p2);
      await p2.evaluate(() => { const h = document.getElementById("harga"); h && h.scrollIntoView({ block: "start" }); });
      await wait(2500);
      await shot(p2, `har-${kind}-survei`);
      await c2.close();
      const c3 = await ctx(kind); const p3 = await c3.newPage();
      await p3.goto("https://harinesia.id/", { waitUntil: "domcontentloaded" });
      await settle(p3, 2500); await noCounter(p3);
      await shot(p3, `har-${kind}-home-hero`);
      await c3.close();
    }
  },

  // ---------- quiz.basrh.com public pages ----------
  async quiz() {
    for (const kind of ["d", "m"]) {
      const c = await ctx(kind); const p = await c.newPage();
      await p.goto("https://quiz.basrh.com/", { waitUntil: "domcontentloaded" });
      await settle(p, 2500);
      await shot(p, `quiz-${kind}-home-hero`);
      await warm(p);
      for (const sel of ["#how", "#features"]) {
        if (await p.locator(sel).count()) { await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "start" }), sel); await wait(1500); await shot(p, `quiz-${kind}-home-${sel.slice(1)}`); }
      }
      const leave = p.getByText("See exactly where people leave.");
      if (await leave.count()) { await leave.first().scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -120)); await wait(2000); await shot(p, `quiz-${kind}-home-leave`); }
      if (kind === "d") await shot(p, `quiz-d-home-full`, { fullPage: true });
      await c.close();
    }
  },

  // ---------- quiz app run locally in mock mode (sample data, no login to the live account) ----------
  async quizlocal() {
    const base = process.env.QUIZ_LOCAL || "http://localhost:3100";
    const c = await ctx("d"); const p = await c.newPage();
    await p.goto(base + "/dev", { waitUntil: "domcontentloaded" });
    await settle(p, 2000);
    const links = await p.$$eval("a", (as) => as.map((a) => ({ t: a.textContent.trim().replace(/\s+/g, " "), h: a.getAttribute("href") })));
    fs.writeFileSync(path.join(OUT, "quizlocal-dev-links.json"), JSON.stringify(links, null, 1));
    console.log(links.length, "dev links written");
    await shot(p, "quizlocal-dev", { fullPage: true });
    await c.close();
  },

  async quizapp() {
    const base = process.env.QUIZ_LOCAL || "http://localhost:3100";
    const devHide = "nextjs-portal,[data-nextjs-toast],#__next-build-watcher,a[href=\"/dev\"]{display:none!important}";
    const c = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
    const p = await c.newPage();
    await p.goto(base + "/dev/session?as=user&next=%2Fdashboard", { waitUntil: "domcontentloaded" });
    await settle(p, 2500);
    const pages = [
      ["dash-list", "/dashboard"],
      ["dash-editor", "/dashboard/quiz-body-reset"],
      ["dash-summary", "/dashboard/quiz-body-reset/responses"],
      ["dash-individual", "/dashboard/quiz-body-reset/responses?view=individual"],
      ["dash-empty", "/dashboard/quiz-customer-feedback/responses"],
      ["dash-ui", "/dev/ui"],
    ];
    for (const [n, u] of pages) {
      await p.goto(base + u, { waitUntil: "domcontentloaded" }); await settle(p, 2500);
      await hideCss(p, devHide); await wait(300);
      await shot(p, "quizapp-d-" + n);
      if (n === "dash-summary" || n === "dash-ui") await shot(p, "quizapp-d-" + n + "-full", { fullPage: true });
    }
    // editor: open a question page so the properties panel shows a real question
    await p.goto(base + "/dashboard/quiz-body-reset", { waitUntil: "domcontentloaded" }); await settle(p, 2500); await hideCss(p, devHide);
    const q2 = p.getByText("What is your main goal?").first();
    if (await q2.count()) { await q2.click(); await wait(1200); await shot(p, "quizapp-d-dash-editor-q"); }
    await c.close();
    const m = await ctx("m"); const q = await m.newPage();
    await q.goto(base + "/quiz/body-reset", { waitUntil: "domcontentloaded" }); await settle(q, 2500); await hideCss(q, devHide);
    await shot(q, "quizapp-m-run-00");
    await q.getByRole("button", { name: /start the quiz/i }).click(); await wait(1500);
    await shot(q, "quizapp-m-run-01");
    await q.getByRole("button").filter({ hasText: /lose weight/i }).first().click().catch(() => {}); await wait(1500);
    await shot(q, "quizapp-m-run-02");
    await q.getByRole("button", { name: /continue/i }).first().click().catch(() => {}); await wait(1200);
    await shot(q, "quizapp-m-run-03-error");
    await m.close();
  },

  async hbpquiz() {
    const m = await ctx("m"); const q = await m.newPage();
    await q.goto("https://healthyboostplan.basrh.com/quiz/body-reset-01", { waitUntil: "domcontentloaded" });
    await settle(q, 3000);
    await q.getByText("Start my plan").first().click(); await wait(2200);
    for (let i = 1; i <= 7; i++) {
      await shot(q, "hbp-m-quiz-0" + i);
      const opts = q.locator("button:visible");
      const n = await opts.count();
      // pick the second visible button (first is usually the back arrow)
      if (n < 2) break;
      await opts.nth(1).click().catch(() => {}); await wait(2400);
      const cont = q.getByRole("button", { name: /continue|next/i });
      if (await cont.count()) { await cont.first().click().catch(() => {}); await wait(2000); }
    }
    await m.close();
  },

  async falafel() {
    for (const kind of ["d", "m"]) {
      const c = await ctx(kind); const p = await c.newPage();
      try {
        await p.goto("https://falafelfresh.com/", { waitUntil: "commit", timeout: 120000 });
        await wait(12000);
        await shot(p, `falafel-${kind}-hero`, { animations: "disabled", timeout: 90000 });
        if (kind === "d") { await warm(p); await shot(p, `falafel-d-full`, { fullPage: true, animations: "disabled", timeout: 90000 }); }
      } catch (e) { console.log("ERR falafel", kind, e.message); }
      await c.close();
    }
  },

  // ---------- Healthy Boost Plan ----------
  async hbp() {
    const c = await ctx("d"); const p = await c.newPage();
    await p.goto("https://healthyboostplan.basrh.com/", { waitUntil: "domcontentloaded" });
    await settle(p, 2500);
    await shot(p, "hbp-d-hero");
    await c.close();
    const m = await ctx("m"); const q = await m.newPage();
    await q.goto("https://healthyboostplan.basrh.com/quiz/body-reset-01", { waitUntil: "domcontentloaded" });
    await settle(q, 3000);
    await shot(q, "hbp-m-quiz-00");
    await c.close();
    await m.close();
  },

  // ---------- client sites (front-end builds) ----------
  async clients() {
    const sites = [["sbenrc", "https://sbenrc.com.au/"], ["falafel", "https://falafelfresh.com/"], ["byk", "https://beyourkind.com/"]];
    for (const [k, url] of sites) {
      for (const kind of ["d", "m"]) {
        const c = await ctx(kind); const p = await c.newPage();
        try {
          await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
          await settle(p, 3000);
          await shot(p, `${k}-${kind}-hero`);
          if (kind === "d") { await warm(p); await shot(p, `${k}-d-full`, { fullPage: true }); }
        } catch (e) { console.log("ERR", k, kind, e.message); }
        await c.close();
      }
    }
  },
};

browser = await chromium.launch();
try {
  for (const j of process.argv.slice(2)) { console.log("==", j); await jobs[j](); }
} finally { await browser.close(); }
