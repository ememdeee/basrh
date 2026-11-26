"""Resize, crop and compress screenshots from shots/ into img/ for the PDF.
Each entry: output name, source, max width, optional crop box (x0, y0, x1, y1) in source pixels."""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, OUT = os.path.join(HERE, "shots"), os.path.join(HERE, "img")
os.makedirs(OUT, exist_ok=True)

D, M = 1360, 500   # desktop and phone widths (about 2x their size on the page)
JOBS = [
    # basrh.com
    *[(f"basrh-s{i}", f"basrh-d-s{i}.png", 640, None) for i in (1, 2, 3, 4, 6, 7, 8)],
    ("basrh-s5-front", "basrh-d-s5-front.png", 640, None),
    ("basrh-s5-front-big", "basrh-d-s5-front.png", D, None),
    ("basrh-s5-back-list", "basrh-d-s5-back-list.png", D, (120, 150, 1320, 720)),
    ("basrh-m-s1", "basrh-m-s1.png", M, None),
    ("basrh-m-s5-front", "basrh-m-s5-front.png", M, None),
    ("basrh-m-s5-open", "basrh-m-s5-open.png", M, None),
    ("basrh-m-s4", "basrh-m-s4.png", M, None),
    # Harinesia
    ("har-d-hero", "har-d-panduan-hero.png", D, (0, 0, 1440, 770)),
    ("har-d-testimoni", "har-d-panduan-testimoni.png", D, None),
    ("har-d-resep", "har-d-panduan-resep.png", D, None),
    ("har-m-hero", "har-m-panduan-hero.png", M, None),
    ("har-m-resep", "har-m-panduan-resep.png", M, None),
    ("har-m-survei", "har-m-survei.png", M, None),
    ("har-m-harga", "har-m-panduan-harga.png", M, None),
    ("har-m-testimoni", "har-m-panduan-testimoni.png", M, None),
    ("har-m-contoh", "har-m-panduan-contoh.png", M, None),
    # Quiz
    ("quiz-live-hero", "quiz-d-home-hero.png", D, None),
    ("quiz-editor", "quizapp-d-dash-editor-q.png", 1600, None),
    ("quiz-summary", "quizapp-d-dash-summary.png", 1600, None),
    ("quiz-list", "quizapp-d-dash-list.png", 1400, (0, 0, 2560, 1350)),
    ("quiz-ui", "quizapp-d-dash-ui.png", 1400, (0, 0, 2560, 1400)),
    ("quiz-m-start", "quizapp-m-run-00.png", M, None),
    ("quiz-m-q", "quizapp-m-run-01.png", M, None),
    ("hbp-d-hero", "hbp-d-hero.png", 1200, None),
    ("hbp-m-age", "hbp-m-quiz-01.png", M, None),
    # client builds
    ("sbenrc-d", "sbenrc-d-hero.png", 1100, None),
    ("sbenrc-m", "sbenrc-m-hero.png", M, None),
    ("falafel-d", "falafel-d-hero.png", 1100, None),
    ("byk-d", "byk-d-hero.png", 1100, None),
    ("byk-m", "byk-m-hero.png", M, None),
]

total = 0
for name, src, w, crop in JOBS:
    p = os.path.join(SRC, src)
    if not os.path.exists(p):
        print("MISSING", src); continue
    im = Image.open(p).convert("RGB")
    if crop: im = im.crop(crop)
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    out = os.path.join(OUT, name + ".jpg")
    im.save(out, "JPEG", quality=80, optimize=True, progressive=True, subsampling=0)
    total += os.path.getsize(out)
    print(f"{name:22s} {im.width}x{im.height} {os.path.getsize(out)//1024} KB")
print("TOTAL", total // 1024, "KB")
