"""Build cabinet-front masks for the 2D plan images.
usage: python3 masks.py SRC OUT [DEBUG.png] [x,y ...] [+x,y ...]
  x,y   (source pixels) removes the white region under that point (a wall, backsplash or window).
  +x,y  always keeps the white region under that point, even when it is too large or too narrow
        for the automatic filter: tall end panels, columns and peninsula ends."""
import sys, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
args = sys.argv[3:]
dbg = args.pop(0) if args and args[0].lower().endswith('.png') else None
pts = [tuple(map(int, p.split(','))) for p in args if not p.startswith('+')]
add = [tuple(map(int, p[1:].split(','))) for p in args if p.startswith('+')]
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
o = Image.new('RGBA',(W,H),(0,0,0,0)); o.putalpha(Image.fromarray((m*255).astype('uint8'),'L')); o.save(out, optimize=True)
if dbg:
    arr=np.asarray(im.convert('RGB')).copy(); arr[m]=[200,60,40]
    d=Image.fromarray(arr); dr=ImageDraw.Draw(d)
    for x in range(0,W,100): dr.line([(x,0),(x,H)],fill=(0,0,255) if x%500==0 else (150,150,255))
    for y in range(0,H,100): dr.line([(0,y),(W,y)],fill=(0,0,255) if y%500==0 else (150,150,255))
    d.save(dbg)
print(src, int(keep.sum()))
