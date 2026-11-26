"""Render every PDF page to PNG (for checking) and print file facts: size, pages, fonts, links.
Usage: python preview.py <file.pdf> [<outdir>] [--dpi 110]"""
import os, sys
import fitz

pdf = sys.argv[1]
outdir = sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith("--") else os.path.join(os.path.dirname(pdf), "previews")
dpi = int(sys.argv[sys.argv.index("--dpi") + 1]) if "--dpi" in sys.argv else 110
os.makedirs(outdir, exist_ok=True)
doc = fitz.open(pdf)
print(f"{pdf}: {os.path.getsize(pdf)/1024/1024:.2f} MB, {doc.page_count} pages, {doc[0].rect.width:.0f}x{doc[0].rect.height:.0f} pt")
fonts = set()
for i, page in enumerate(doc):
    for f in page.get_fonts(): fonts.add((f[3], f[1]))
    page.get_pixmap(dpi=dpi).save(os.path.join(outdir, f"p{i+1:02d}.png"))
    links = [l.get("uri") for l in page.get_links() if l.get("uri")]
    print(f"  p{i+1:02d}: {len(links)} links {sorted(set(links))[:8]}")
print("fonts:", sorted(fonts))
