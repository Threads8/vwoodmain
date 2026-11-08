"""Build cabinet-front masks for the 2D plan images.
usage: python3 masks.py SRC OUT [DEBUG.png] [--neutral NEUTRAL.png] [x,y ...] [+x,y ...]
                        [~x,y ...] [#x,y,x,y,x,y ...]
  x,y   (source pixels) removes the white region under that point (a wall, backsplash or window).
  +x,y  always keeps the white region under that point, even when it is too large or too narrow
        for the automatic filter: tall end panels, columns and peninsula ends.
  ~x,y  keeps the timber-coloured panel under that point (doors drawn in wood, not white).
  #x,y,x,y,...  keeps the timber-coloured pixels inside this polygon. Used where a wood panel
        touches the wood floor with no closed outline between them (the island front).
  --neutral OUT  also writes a transparent overlay that redraws every timber panel as a near-white
        grey that keeps the panel's outlines, door gaps and soft lighting but drops its grain, so
        the finish multiplied on top looks the same as it does on the white doors."""
import sys, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
args = sys.argv[3:]
dbg = args.pop(0) if args and args[0].lower().endswith('.png') else None
neutral = None
if '--neutral' in args:
    k = args.index('--neutral'); neutral = args[k+1]; del args[k:k+2]
pts = [tuple(map(int, p.split(','))) for p in args if p[0].isdigit()]
add = [tuple(map(int, p[1:].split(','))) for p in args if p.startswith('+')]
wood = [tuple(map(int, p[1:].split(','))) for p in args if p.startswith('~')]
polys = [list(map(int, p[1:].split(','))) for p in args if p.startswith('#')]
im = Image.open(src).convert('RGBA'); a = np.asarray(im).astype(int)
r,g,b,al = a[...,0],a[...,1],a[...,2],a[...,3]
H,W = r.shape
sat = np.max(a[...,:3],-1)-np.min(a[...,:3],-1)
white = (r>238)&(g>238)&(b>238)&(al>200)
lab, n = ndimage.label(white)
objs = ndimage.find_objects(lab)
keep = np.zeros(n+1,bool)
for i,sl in enumerate(objs,1):
    reg = lab[sl]==i; sz = reg.sum()
    if sz < 120: continue
    h = sl[0].stop-sl[0].start; w = sl[1].stop-sl[1].start
    if sl[0].start==0 or sl[1].start==0 or sl[0].stop==H or sl[1].stop==W: continue
    if sz > 0.06*H*W or sz/(h*w) < 0.45 or w > 0.45*W: continue
    # ring of neighbouring pixels must be neutral line-work, not photo colour
    y0,y1 = max(0,sl[0].start-3), min(H,sl[0].stop+3); x0,x1 = max(0,sl[1].start-3), min(W,sl[1].stop+3)
    rr = lab[y0:y1,x0:x1]==i
    ring = ndimage.binary_dilation(rr, iterations=3) & ~rr
    if np.mean(sat[y0:y1,x0:x1][ring] > 40) > 0.25: continue
    keep[i]=True
for x,y in pts:
    keep[lab[y,x]] = False
for x,y in add:
    if not lab[y,x]: sys.exit(f"{src}: +{x},{y} is not on a white region")
    keep[lab[y,x]] = True
m = ndimage.binary_dilation(keep[lab], iterations=1)

# Timber panels: warm, mid-tone pixels. Dark grain knots and door gaps are filled in afterwards.
lum = (r*299 + g*587 + b*114) / 1000
timber = (r-b > 30) & (r >= g) & (g >= b) & (lum > 90) & (lum < 235) & (al > 200)
tlab, _ = ndimage.label(timber)
t = np.zeros((H,W), bool)
for x,y in wood:
    if not tlab[y,x]: sys.exit(f"{src}: ~{x},{y} is not on a timber panel")
    t |= tlab == tlab[y,x]
# Take in thin timber slivers cut off by a single line (a cabinet's underside or top edge).
# Not done for polygons: there the next timber beyond the outline is the floor.
t |= timber & ndimage.binary_dilation(t, iterations=3)
for poly in polys:
    p = Image.new('L', (W,H), 0); ImageDraw.Draw(p).polygon(list(zip(poly[::2], poly[1::2])), fill=1)
    t |= timber & (np.asarray(p) > 0)
if t.any():
    # Bridge the 1-3px door gaps and grain streaks, then take the outline pixels too, like the
    # 1px dilation of the white regions above.
    t = ndimage.binary_fill_holes(ndimage.binary_closing(t, iterations=4))
    t = ndimage.binary_dilation(t, iterations=1)
    m |= t
if neutral:
    o = np.zeros((H,W,4), 'uint8')
    if t.any():
        # Broad lighting: the panel's luminance blurred well past the grain, mapped to 236-252.
        wgt = ndimage.gaussian_filter(t.astype(float), 14)
        broad = ndimage.gaussian_filter(np.where(t, lum, 0), 14) / np.maximum(wgt, 1e-6)
        lo, hi = np.percentile(broad[t], [5, 95])
        shade = 236 + 16 * np.clip((broad - lo) / max(hi - lo, 1), 0, 1)
        # Line-work: door gaps and outlines are much darker than the grain around them.
        local = ndimage.median_filter(lum, size=9)
        line = np.clip((local - lum - 25) / 60, 0, 1)
        v = shade * (1 - line) + np.minimum(lum, shade) * line
        o[t, :3] = np.clip(v[t], 0, 255).astype('uint8')[:, None]
        o[t, 3] = 255
    Image.fromarray(o, 'RGBA').save(neutral, optimize=True)
o = Image.new('RGBA',(W,H),(0,0,0,0)); o.putalpha(Image.fromarray((m*255).astype('uint8'),'L')); o.save(out, optimize=True)
if dbg:
    arr=np.asarray(im.convert('RGB')).copy(); arr[m]=[200,60,40]
    d=Image.fromarray(arr); dr=ImageDraw.Draw(d)
    for x in range(0,W,100): dr.line([(x,0),(x,H)],fill=(0,0,255) if x%500==0 else (150,150,255))
    for y in range(0,H,100): dr.line([(0,y),(W,y)],fill=(0,0,255) if y%500==0 else (150,150,255))
    d.save(dbg)
print(src, int(keep.sum()), 'timber px', int(t.sum()))
