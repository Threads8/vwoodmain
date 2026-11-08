#!/usr/bin/env sh
# Rebuilds the cabinet-front masks used by the live 2D kitchen preview.
# Needs Python 3 with numpy, pillow and scipy. Each x,y point removes one white region
# (a wall, backsplash or window highlight) that would otherwise be tinted. Each +x,y point keeps
# one cabinet panel the automatic filter misses (end panels, tall columns, peninsula ends).
# Each ~x,y point keeps a cabinet drawn in timber instead of white, and #x,y,... keeps the timber
# inside a polygon (the island front, which touches the timber floor). Plans with timber panels
# also get a neutral overlay in public/kitchen-plans/neutral, listed in src/config/planFinishes.ts.
set -e
cd "$(dirname "$0")/.."
mkdir -p public/kitchen-plans/masks public/kitchen-plans/neutral
m() { f=$1; shift; python3 scripts/plan-masks.py "public/kitchen-plans/image-$f.png" "public/kitchen-plans/masks/image-$f.png" "$@"; }
m 52 400,200 700,330 600,330 850,330 490,250 380,450 +345,300 +1130,300 +1225,300
m 55 660,240 500,240
m 56 --neutral public/kitchen-plans/neutral/image-56.png 870,330 680,330 1085,330 ~900,55 ~900,160
m 58 --neutral public/kitchen-plans/neutral/image-58.png 760,360 960,270 +490,300 +950,550 ~780,188 ~780,250
m 60 345,290 510,295 1100,400 1030,300 1025,600 750,355 850,355 338,285 342,300 810,350 +285,300 +960,600
m 62 880,235 900,225 +80,300 +180,300 +1350,550
m 64 +1220,300
m 66 560,330 560,200 720,340 900,220 530,265 540,250 +404,300 +1100,300 +1206,300
m 67 --neutral public/kitchen-plans/neutral/image-67.png 940,250 1080,250 830,320 950,240 1085,260 945,260 ~830,150 ~860,210 ~775,220 '#521,490,859,490,858,665,525,665'
