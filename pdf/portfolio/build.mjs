// Render portfolio.html to PDF (16:9 pages) and report layout problems.
// Usage: node build.mjs [out.pdf]
import { chromium } from "file:///D:/Work-or-ticket/quiz/node_modules/playwright/index.mjs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname).replace(/^\/(\w:)/, "$1");
const out = process.argv[2] || path.join(HERE, "portfolio.pdf");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto("file:///" + path.join(HERE, "portfolio.html").replace(/\\/g, "/"));
await page.evaluate(() => document.fonts.ready);
await page.waitForLoadState("networkidle");
const warnings = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll(".page").forEach((pg, i) => {
    const pr = pg.getBoundingClientRect();
    const n = i + 1;
    const limit = pr.bottom - 46; // keep content clear of the footer band
    pg.querySelectorAll("*").forEach((el) => {
      if (el.closest(".ft,.deco,.cover-art") || el.classList.contains("deco")) return;
      const cs = getComputedStyle(el);
      if (cs.position === "absolute" && el.closest(".vp,.scr,.phone,.browser")) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      if (r.bottom > limit + 1 && !pg.classList.contains("cover")) out.push(`p${n}: <${el.tagName.toLowerCase()} class="${el.className}"> bottom ${Math.round(r.bottom - pr.top)} > ${Math.round(limit - pr.top)}`);
      if (r.right > pr.right - 20) out.push(`p${n}: <${el.tagName.toLowerCase()} class="${el.className}"> runs past right edge`);
      // text clipped inside its own box
      if ((el.scrollHeight > el.clientHeight + 2 && cs.overflow === "hidden" && !el.matches(".vp,.scr,.browser,.phone,.page"))) out.push(`p${n}: <${el.tagName.toLowerCase()} class="${el.className}"> clips its content`);
    });
  });
  if (!document.fonts.check('800 20px "Bricolage"') || !document.fonts.check('800 20px "BricolageDisplay"')) out.push("Brand font did not load");
  [...document.images].forEach((im) => { if (!im.complete || !im.naturalWidth) out.push("image missing: " + im.getAttribute("src")); });
  return [...new Set(out)];
});
await page.pdf({ path: out, width: "1280px", height: "720px", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("PDF:", out);
if (warnings.length) { console.log("LAYOUT WARNINGS:"); warnings.slice(0, 60).forEach((w) => console.log(" -", w)); }
else console.log("Layout check: clean");
