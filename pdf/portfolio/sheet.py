"""Make a contact sheet of PNGs for a quick visual check.
Usage: python sheet.py <out.png> <img> [<img> ...]   (each tile ~360px wide, label on top)"""
import sys
from PIL import Image, ImageDraw

out, files = sys.argv[1], sys.argv[2:]
W = 360
tiles = []
for f in files:
    im = Image.open(f).convert("RGB")
    h = int(im.height * W / im.width)
    im = im.resize((W, min(h, 900)) if h <= 900 else (W, h), Image.LANCZOS)
    if im.height > 900:
        im = im.crop((0, 0, W, 900))
    t = Image.new("RGB", (W, im.height + 18), "white")
    t.paste(im, (0, 18))
    ImageDraw.Draw(t).text((4, 3), f.replace("\\", "/").split("/")[-1], fill="black")
    tiles.append(t)
cols = 4
rows = [tiles[i:i + cols] for i in range(0, len(tiles), cols)]
H = sum(max(t.height for t in r) + 8 for r in rows)
sheet = Image.new("RGB", (cols * (W + 8), H), (200, 200, 200))
y = 0
for r in rows:
    x = 0
    for t in r:
        sheet.paste(t, (x, y)); x += W + 8
    y += max(t.height for t in r) + 8
sheet.save(out)
print(out, sheet.size)
