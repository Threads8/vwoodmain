#!/usr/bin/env sh
# Rebuilds the cabinet-front masks used by the live 2D kitchen preview.
# Needs Python 3 with numpy, pillow and scipy. Each x,y point removes one white region
# (a wall, backsplash or window highlight) that would otherwise be tinted.
set -e
cd "$(dirname "$0")/.."
mkdir -p public/kitchen-plans/masks
m() { f=$1; shift; python3 scripts/plan-masks.py "public/kitchen-plans/image-$f.png" "public/kitchen-plans/masks/image-$f.png" "$@"; }
m 52 400,200 360,600 345,100 1245,300 1235,600 700,330 600,330 850,330 490,250 380,450
m 55 660,240 500,240
m 56 870,330 680,330 1085,330
m 58 760,360 960,270 490,350
m 60 345,290 510,295 1100,400 1030,300 1025,600 750,355 850,355 338,285 342,300 810,350
m 62 880,235 900,225
m 64
m 66 405,300 400,550 1205,300 1205,600 560,330 560,200 720,340 900,220 530,265 540,250
m 67 940,250 1080,250 830,320 950,240 1085,260 945,260
