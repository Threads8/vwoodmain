// Content and assets transcribed from the supplied Figma exports.
// Repeated surface copy and gallery imagery are retained from those references.
export type ProductDetail = {
  code: string;
  surfaceDesc: string;
  features: string[];
  color: string;
  sizes: string[];
  images: string[];
  imageWidths: number[];
  hero?: string;
  icons?: string;
  iconsAlt?: string;
  showFeatureIcons?: boolean;
  sides?: string;
  sizeNote?: string;
  hideSizeLabel?: boolean;
};

const builderAsset = (hash: string, width: number) =>
  `https://api.builder.io/api/v1/image/assets/TEMP/${hash}?width=${width}`;

const HIGH_SCRATCH_ICONS_ALT = "High Scratch Resistance, Long Durability, Antibacterial, Eco-friendly";

// Seven of the eight edge tape frames repeat this surface copy, including the matt finishes.
const edgeTape = (detail: Pick<ProductDetail, "code" | "color" | "images" | "imageWidths"> & Partial<ProductDetail>): ProductDetail => ({
  surfaceDesc: "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
  features: ["HIGH-GLOSS ACRYLIC FINISH", "BRIGHTENS & OPENS UP SMALLER SPACES", "SCRATCH & STAIN RESISTANT"],
  sizes: ["1x22 MM"],
  ...detail,
});

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "arctic-matt-edge-tape": edgeTape({
    code: "VW63035M",
    surfaceDesc: "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    features: ["SMOOTH, LOW-GLARE MATT FINISH", "FINGERPRINT RESISTANT", "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"],
    color: "#EEE",
    images: [builderAsset("4c85bd19cd650938ee941173276842856766c652", 414), builderAsset("d32a94d782ad2a2d9d10aac4ed54d8542993080c", 686), builderAsset("4e0ef501ab547b3d6825433faa054defa26f37b0", 414)],
    imageWidths: [207, 343, 207],
    icons: builderAsset("abf2b002d3e087e266bf2dd0d15e2006dd78efd3", 772),
    iconsAlt: HIGH_SCRATCH_ICONS_ALT,
  }),
  "alabaster-gloss-edge-tape": edgeTape({
    code: "VW63035M",
    color: "#F8F8F8",
    images: [builderAsset("be4aec52573724c28c722c0420967b0b35c36fd5", 414), builderAsset("a3205f850e871e4e3b5df2eb37371b5f03b3466e", 686), builderAsset("71b8a749d6486366d54247ce694cec79587271aa", 414)],
    imageWidths: [207, 343, 207],
    icons: builderAsset("5a29f145591e022f90bd9dfc42aaa13d04385542", 780),
  }),
  "olive-super-matt-edge-tape": edgeTape({
    code: "VW63841M",
    color: "#ACB8AA",
    images: [builderAsset("266f2f3320e3bbf1941935643e8ba2e01159c973", 408), builderAsset("4ea46c49f32faad24a7ccd30b640cac9b98e538d", 364), builderAsset("fa476730e751063d79a00e7c74a22da58822b986", 320)],
    imageWidths: [204, 182, 160],
    icons: builderAsset("5a29f145591e022f90bd9dfc42aaa13d04385542", 780),
  }),
  "shiny-white-gloss-edge-tape": edgeTape({
    code: "VW853",
    color: "#D3D3D3",
    hero: builderAsset("4f09ae24d4d8a1e030b8e9f9969066fc278466d9", 1082),
    images: [builderAsset("fd537a7b82a94825fa87a3bf785874ffe3cf7994", 686), builderAsset("b9a7aa115e7f81e1f97eaa574804e96ca207089e", 650)],
    imageWidths: [343, 325],
    showFeatureIcons: false,
  }),
  "warm-white-gloss-edge-tape": edgeTape({
    code: "VW007",
    color: "#F9F9F9",
    images: [builderAsset("6de238b81b982744f687c54d35ceec50310c1906", 650), builderAsset("782d7b0a1186b797093e0bae7749f931cd6133d1", 1176)],
    imageWidths: [325, 588],
    showFeatureIcons: false,
  }),
  "diamond-grey-gloss-edge-tape": edgeTape({
    code: "VW1087",
    color: "#535353",
    hero: builderAsset("7d6bd51077486340d089113079d6565f2f2e107b", 1082),
    images: [builderAsset("6de238b81b982744f687c54d35ceec50310c1906", 650), builderAsset("782d7b0a1186b797093e0bae7749f931cd6133d1", 1176)],
    imageWidths: [325, 588],
    showFeatureIcons: false,
  }),
  "raven-black-matt-edge-tape": edgeTape({
    code: "VW006SM",
    color: "#2B2A28",
    // The first image was supplied as a separate 243 x 243 frame and fills the slot left empty in the page frame.
    images: [builderAsset("949571d2d274d0d01985c84e8a54049047d452ce", 486), builderAsset("c6a1db9f3c9ad31896be5e526c3e798b59d6705c", 606), builderAsset("7e2ac78a2abd74ab8d58060e9fc39d5cd2fb7c56", 490)],
    imageWidths: [243, 303, 245],
    icons: builderAsset("9086ab77f4d0e7ea0e7ef46bc3249b25045f9d08", 772),
    iconsAlt: HIGH_SCRATCH_ICONS_ALT,
  }),
  "snow-white-matt-edge-tape": edgeTape({
    code: "VW806SM",
    color: "#FCFBF7",
    images: [builderAsset("4b0bc782f7c09de90fe205a44b57c964e58d6776", 468), builderAsset("d6700393e5f808766da5fb7f12cc0dffb6cee0ef", 594), builderAsset("e383fbcae8051a4c779ff93d3f9caaad26d0862c", 642)],
    imageWidths: [234, 297, 321],
    icons: builderAsset("abf2b002d3e087e266bf2dd0d15e2006dd78efd3", 772),
    iconsAlt: HIGH_SCRATCH_ICONS_ALT,
  }),
  "arctic-matt": {
    "code": "VW63035M",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#EEE",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/4c85bd19cd650938ee941173276842856766c652?width=414",
      "https://api.builder.io/api/v1/image/assets/TEMP/a43eb5236b431eeebeaffd7f1105a556d0cfa9d1?width=686",
      "https://api.builder.io/api/v1/image/assets/TEMP/4e0ef501ab547b3d6825433faa054defa26f37b0?width=414"
    ],
    "imageWidths": [
      207,
      343,
      207
    ],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/e76ada6faa76efad4845dab91d2f2d4f797018a1?width=772"
  },
  "alabaster-gloss": {
    "code": "VW63035M",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#F8F8F8",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/4a7cffd07434a10c3546af69ab5266b444f110e9?width=414",
      "https://api.builder.io/api/v1/image/assets/TEMP/8b379816f410e726a0a5230db5a70c6514e45ff4?width=686",
      "https://api.builder.io/api/v1/image/assets/TEMP/71b8a749d6486366d54247ce694cec79587271aa?width=414"
    ],
    "imageWidths": [
      207,
      343,
      207
    ],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/5a29f145591e022f90bd9dfc42aaa13d04385542?width=780"
  },
  "olive-super-matt": {
    "code": "VW63841M",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#ACB8AA",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/266f2f3320e3bbf1941935643e8ba2e01159c973?width=408",
      "https://api.builder.io/api/v1/image/assets/TEMP/4ea46c49f32faad24a7ccd30b640cac9b98e538d?width=364",
      "https://api.builder.io/api/v1/image/assets/TEMP/fa476730e751063d79a00e7c74a22da58822b986?width=320"
    ],
    "imageWidths": [
      204,
      182,
      160
    ],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/5a29f145591e022f90bd9dfc42aaa13d04385542?width=780"
  },
  "shiny-white-gloss": {
    "code": "VW853",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/fd537a7b82a94825fa87a3bf785874ffe3cf7994?width=686",
      "https://api.builder.io/api/v1/image/assets/TEMP/b9a7aa115e7f81e1f97eaa574804e96ca207089e?width=650"
    ],
    "imageWidths": [
      343,
      325
    ],
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/8cc118c015723c0a88aba5c5903354a9e703b86b?width=1082"
  },
  "warm-white-gloss": {
    "code": "VW007",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#F9F9F9",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/6de238b81b982744f687c54d35ceec50310c1906?width=650",
      "https://api.builder.io/api/v1/image/assets/TEMP/782d7b0a1186b797093e0bae7749f931cd6133d1?width=1176"
    ],
    "imageWidths": [
      325,
      588
    ]
  },
  "diamond-grey-gloss": {
    "code": "VW1087",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#535353",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/6de238b81b982744f687c54d35ceec50310c1906?width=650",
      "https://api.builder.io/api/v1/image/assets/TEMP/782d7b0a1186b797093e0bae7749f931cd6133d1?width=1176"
    ],
    "imageWidths": [
      325,
      588
    ]
  },
  "raven-black-matt": {
    "code": "VW006SM",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#2B2A28",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/c6a1db9f3c9ad31896be5e526c3e798b59d6705c?width=606",
      "https://api.builder.io/api/v1/image/assets/TEMP/7e2ac78a2abd74ab8d58060e9fc39d5cd2fb7c56?width=490"
    ],
    "imageWidths": [
      303,
      245
    ],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/abf2b002d3e087e266bf2dd0d15e2006dd78efd3?width=772"
  },
  "snow-white-matt": {
    "code": "VW806SM",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#FCFBF7",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/4b0bc782f7c09de90fe205a44b57c964e58d6776?width=468",
      "https://api.builder.io/api/v1/image/assets/TEMP/d6700393e5f808766da5fb7f12cc0dffb6cee0ef?width=594",
      "https://api.builder.io/api/v1/image/assets/TEMP/e383fbcae8051a4c779ff93d3f9caaad26d0862c?width=642"
    ],
    "imageWidths": [
      234,
      297,
      321
    ],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/abf2b002d3e087e266bf2dd0d15e2006dd78efd3?width=772"
  },
  "maple-wood-natural": {
    "code": "VW9E1128-2",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#EEE",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/afd5636572486b97cadebe40e88d3d93d68db94e?width=436"
    ],
    "imageWidths": [
      218
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/ba870cc88924decb179a54317651c032fbb62e92?width=1084"
  },
  "natural-brown": {
    "code": "VW9E1633-8",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/e650b5052954d635c75389bc24f5715ed10e7fa0?width=1082"
  },
  "oak-wood-natural": {
    "code": "VW9E1633-7",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/00bf36736bc1de666bfd58e3ae63c9ba96ebae84?width=1082"
  },
  "grey-wood-natural": {
    "code": "VW9F0203-1",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/fd537a7b82a94825fa87a3bf785874ffe3cf7994?width=686"
    ],
    "imageWidths": [
      343
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/7d99abf882905bf930d5d486d516c746891e1053?width=1082"
  },
  "southern-oakwood": {
    "code": "VW8E140-16",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#F9F9F9",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/d23cfc7edca22189718bee7e399a84d4b3833a72?width=846",
      "https://api.builder.io/api/v1/image/assets/TEMP/76f6bab5d01d4c1b47a7843daf79f2d9ffc991a7?width=484"
    ],
    "imageWidths": [
      423,
      242
    ],
    "showFeatureIcons": false
  },
  "washed-maple-wood-natural": {
    "code": "VW8E516-2",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#EEE",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/17e460639879c94ac30f8ce27b82ed6c047520bd?width=652",
      "https://api.builder.io/api/v1/image/assets/TEMP/975927505d225d435f10b3bd0fb9cef50f20eb5b?width=330"
    ],
    "imageWidths": [
      326,
      165
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/06bebc3908e4871c8ca6006e61e1341761ff09b0?width=1084"
  },
  "moss-grey-wood": {
    "code": "VW9F0202-1",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/b1e7dc7ac1facf01deab51dd3236792da5dc6dc3?width=566"
    ],
    "imageWidths": [
      283
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/82ec6da9adb0b001d89c6314b1bdd193008d91b7?width=1082"
  },
  "washed-oakwood": {
    "code": "VW806SM",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#FCFBF7",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/df1ce66dfff70fcc27e775805137f0c8ed4471ab?width=600"
    ],
    "imageWidths": [
      300
    ],
    "showFeatureIcons": false
  },
  "rural-oak": {
    "code": "VW8E0718-11N",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#EEE",
    "sizes": [
      "2440x1220"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/50bc8216ec6c46bb05e523666386b4e92e299a8f?width=1084"
  },
  "maple-shadow": {
    "code": "VW9F0206-2",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/5f3c5ee75ced3ea5e62546e81d755a313cc431cc?width=1082"
  },
  "golden-oak": {
    "code": "VW9E1532-3",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/11b16374d87bc4b7bd2e34769414d7b96aee00f1?width=382",
      "https://api.builder.io/api/v1/image/assets/TEMP/d5dbcf089d1bc30a3e896ba808addfdc5c65256e?width=270"
    ],
    "imageWidths": [
      191,
      135
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/6c93c14e8a8f31631e53548298e8386646eed4af?width=1082"
  },
  "musket-brown": {
    "code": "VW8E1027-9",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/59ff91c0e5dfffecba6615363119b258c85eb35a?width=730",
      "https://api.builder.io/api/v1/image/assets/TEMP/2f99e709b1782bfdecc6a65b3c475ef1f1e852a8?width=724"
    ],
    "imageWidths": [
      365,
      362
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/7d99abf882905bf930d5d486d516c746891e1053?width=1082"
  },
  "sand-dune": {
    "code": "VW9F25177Z-4",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#F3F3F3",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/40b035a0a58b6810418cb773e7b43b13c1b5ff9d?width=378",
      "https://api.builder.io/api/v1/image/assets/TEMP/049a628d10084c705208e727bba40cc05eaea033?width=800"
    ],
    "imageWidths": [
      189,
      400
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/36fe224b2a0be6ccbc1e48d3f34fff0e3fde2e8f?width=1082"
  },
  "prime-oak": {
    "code": "VW8E516-2",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#EEE",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/17e460639879c94ac30f8ce27b82ed6c047520bd?width=652",
      "https://api.builder.io/api/v1/image/assets/TEMP/975927505d225d435f10b3bd0fb9cef50f20eb5b?width=330"
    ],
    "imageWidths": [
      326,
      165
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/6a94801161f48e419878af63ea376e06ea04907c?width=1084"
  },
  "aged-ash": {
    "code": "VW9E59291",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2880x1220"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/787a57bdebe8f28955ac757ea2dcac3f06126ef5?width=1082"
  },
  "anthracite": {
    "code": "",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#424443",
    "sizes": [
      "2440x1220"
    ],
    "images": [],
    "imageWidths": [],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/09f2629ee7561d26391f054a53f791af414f8648?width=772",
    "iconsAlt": "High Scratch Resistance, Long Durability, Antibacterial, Eco-friendly"
  },
  "ultra-high-gloss-iron-ore": {
    "code": "",
    "surfaceDesc": "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    "features": [
      "HIGH-GLOSS ACRYLIC FINISH",
      "BRIGHTENS & OPENS UP SMALLER SPACES",
      "SCRATCH & STAIN RESISTANT"
    ],
    "color": "#424443",
    "sizes": [
      "2440x1220"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "sides": "1 Side"
  },
  "single-bowl-sink-square": {
    "code": "LS-4444",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "440X440X205"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/f6c163dd779cd1a7ab8dab599ad85da7382d94d9?width=576"
    ],
    "imageWidths": [
      288
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/8ad225c0104641b1961595e3b2295b92fb6dda8c?width=1082"
  },
  "single-bowl-sink-wide": {
    "code": "LS-6045",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "600X450X205"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/5f411c4cc5a6557468af9ac90a7c630fdfeb1198?width=320"
    ],
    "imageWidths": [
      160
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/ff7592e4517ce794bcf842dcf929f745e52f884e?width=1082"
  },
  "pull-out-rubbish-bin": {
    "code": "WB.0240.C",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "440X440X205"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/54a80f0e010eba9923805849cad005016e4179bb?width=1082"
  },
  "rubbish-bin-wb-0240-a": {
    "code": "WB.0240.A",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "W(265)XD(500)XH(500mm)"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/65934b9cca13f28f0f8f3cd92cf08b14c9b1688b?width=1098",
    "sizeNote": "For 300mm Cabinet, 18L+6Lr",
    "hideSizeLabel": true
  },
  "drawer-runner": {
    "code": "SL6118",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "H(118MM)XL(350MM)XT(1.2MM)"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/af9203098be70682c2349732fc43c612ff6d370b?width=1092",
    "sizeNote": "1pair/bag, with 12screws each)"
  },
  "one-and-a-half-bowl-sink": {
    "code": "LS-7145HAr",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "710X450X205"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/3941a825a77eb59df8cb247846419c2b2619c198?width=640"
    ],
    "imageWidths": [
      320
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/0ead0359ef569a17cdff0d6f5d3444007cace206?width=1082"
  }
};
