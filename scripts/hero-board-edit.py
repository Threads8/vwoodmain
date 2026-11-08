# Source: the original hero photo, IMG.homeHero in src/lib/site-data.ts (1670 x 942 PNG).
# Writes public/images/home-hero.webp: python scripts/hero-board-edit.py ORIGINAL.png public/images/home-hero.webp PREVIEW.png
# Needs numpy, pillow and opencv-python.
"""Lower the Washed Oakwood board's top edge in the home hero photo to Classic Walnut's line.
usage: python edit_hero.py SRC OUT.webp PREVIEW.png"""
import sys, numpy as np, cv2
from PIL import Image
src, out, preview = sys.argv[1], sys.argv[2], sys.argv[3]
a = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H, W, _ = a.shape
L = a.mean(-1)
X0, X1 = 192, 423                      # board's first and last columns
PAD_L, PAD_R = 10, 3                   # the board's dark edge lines and soft shadow just outside it
def board_top(x):
    col = L[:, x]
    for y in range(150, 400):
        if col[y] > 170 and col[y+3] > 170 and col[y+6] > 170: return y
    raise SystemExit(f"no board top at {x}")
old = {x: board_top(min(max(x, X0), X1)) - 4 for x in range(X0 - PAD_L, X1 + PAD_R + 1)}  # -4: past the soft edge highlight
slope = 19 / 222                       # Classic Walnut's top edge: 271 -> 290 over 222px
new_top = lambda x: 271.0 + (min(max(x, X0), X1) - X0) * slope
old_line = lambda x: np.interp(x, [X0, X1], [old[X0], old[X1]])
# Fill sources, as float maps for cv2.remap.
LINE = np.array([0.745, -0.667])       # wave lines run this way (up-right), unchanged along it
mapx = np.tile(np.arange(W, dtype=np.float32), (H, 1)); mapy = np.tile(np.arange(H, dtype=np.float32)[:, None], (1, W))
dmapx, dmapy = mapx.copy(), mapy.copy()
region = np.zeros((H, W), np.float32)  # 1 = fully wall now, fractional on the new edge
for x in range(X0 - PAD_L, X1 + PAD_R + 1):
    t0, t1 = old[x], new_top(x)
    for y in range(t0, int(np.ceil(t1)) + 1):
        region[y, x] = np.clip(t1 - y, 0, 1)
        mapy[y, x] = 2 * t0 - 1 - y                     # vertical mirror (rod, plain wall)
        s = (y - old_line(x) + 8) / 0.79 + 2            # diagonal: step until clear of the old edge
        dmapx[y, x] = x + LINE[0] * s; dmapy[y, x] = y + LINE[1] * s
img = a.astype(np.float32)
vert = cv2.remap(img, mapx, mapy, cv2.INTER_LINEAR)
diag = cv2.remap(img, dmapx, dmapy, cv2.INTER_LINEAR)
# Diagonal wherever its sample stays left of the hanging rod (x~303); vertical mirror beyond it.
w = np.clip((dmapx - 280) / 15, 0, 1)[..., None]                      # 0 = diagonal, 1 = vertical
fill = diag * (1 - w) + vert * w
# Feather the fill's left boundary into the untouched wall beside the board.
for i in range(4):
    region[:, X0 - PAD_L + i] *= (i + 1) / 5
r = region[..., None]
res = img * (1 - r) + fill * r
img8 = np.clip(res, 0, 255).astype(np.uint8)
# Blend the old edge row on the vertical-fill side, where a mirror leaves a faint seam.
seam = np.zeros((H, W), np.uint8)
for x in range(268, X1 + PAD_R + 1):            # vertical-fill side only; the diagonal side has no seam
    seam[old[x] - 2:old[x] + 3, x] = 255
# Where the wave lines are but a diagonal sample would land on the rod, neither fill fits: inpaint,
# staying 4px clear of the new board edge so no board colour is drawn upward.
rows = np.arange(H)[:, None]
clear_of_board = rows < (271.0 + (np.clip(np.arange(W), X0, X1) - X0) * slope)[None, :] - 4
seam[(region > 0) & (dmapx > 280) & (np.arange(W)[None, :] < 268) & clear_of_board] = 255
img8 = cv2.cvtColor(cv2.inpaint(cv2.cvtColor(img8, cv2.COLOR_RGB2BGR), seam, 3, cv2.INPAINT_TELEA), cv2.COLOR_BGR2RGB)
# Last few px above the new edge where the inpaint stays clear of the board: continue the wall
# colour straight down, then keep the anti-aliased edge.
for x in range(222, 270):
    t1 = new_top(x); top_band = int(t1) - 5
    wall = img8[top_band - 1, x].astype(np.float32)
    for y in range(top_band, int(np.ceil(t1)) + 1):
        c = np.clip(t1 - y, 0, 1)
        img8[y, x] = np.clip(wall * c + a[y, x] * (1 - c), 0, 255).astype(np.uint8)
res = Image.fromarray(img8)
res.save(out, "WEBP", quality=90, method=6)
side = Image.new("RGB", (680 * 2 + 10, 360), "white")
side.paste(Image.open(src).convert("RGB").crop((140, 150, 480, 330)).resize((680, 360)), (0, 0))
side.paste(res.crop((140, 150, 480, 330)).resize((680, 360)), (690, 0))
side.save(preview)
print("done")
