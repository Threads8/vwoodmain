import mossGreyWood from "@/assets/products/moss-grey-wood.png";
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
  /** Colour exactly as the product sheet writes it, e.g. "Black+White+Chrome". Display text only. */
  colorName?: string;
  /** Finish/material exactly as the product sheet writes it, e.g. "Stainless Steel+Plastic". Display text only. */
  finishName?: string;
};

const builderAsset = (hash: string, width: number) =>
  `https://api.builder.io/api/v1/image/assets/TEMP/${hash}?width=${width}`;

// Seven of the eight edge tape frames repeat this surface copy, including the matt finishes.
const edgeTape = (detail: Pick<ProductDetail, "code" | "color" | "images" | "imageWidths"> & Partial<ProductDetail>): ProductDetail => ({
  surfaceDesc: "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
  features: ["HIGH-GLOSS ACRYLIC FINISH", "BRIGHTENS & OPENS UP SMALLER SPACES", "SCRATCH & STAIN RESISTANT"],
  sizes: ["1x22 MM"],
  ...detail,
});

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  // Carcass tape; its page frame repeats the Alabaster Gloss tape photos.
  "white-satin-carcass-edge-tape": edgeTape({
    code: "VWX5002SWR",
    color: "#FFF",
    sizes: ["1x21 MM"],
    images: [builderAsset("be4aec52573724c28c722c0420967b0b35c36fd5", 414), builderAsset("a3205f850e871e4e3b5df2eb37371b5f03b3466e", 686), builderAsset("71b8a749d6486366d54247ce694cec79587271aa", 414)],
    imageWidths: [207, 343, 207],
  }),
  // Carcass tape; its page frame repeats the Alabaster Gloss tape photos.
  "white-gloss-carcass-edge-tape": edgeTape({
    code: "VWX4001GWR",
    color: "#FFF",
    sizes: ["1x22 MM"],
    images: [builderAsset("be4aec52573724c28c722c0420967b0b35c36fd5", 414), builderAsset("a3205f850e871e4e3b5df2eb37371b5f03b3466e", 686), builderAsset("71b8a749d6486366d54247ce694cec79587271aa", 414)],
    imageWidths: [207, 343, 207],
  }),
  "arctic-matt-edge-tape": edgeTape({
    code: "VW63035M",
    surfaceDesc: "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    features: ["SMOOTH, LOW-GLARE MATT FINISH", "FINGERPRINT RESISTANT", "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"],
    color: "#EEE",
    images: [builderAsset("4c85bd19cd650938ee941173276842856766c652", 414), builderAsset("d32a94d782ad2a2d9d10aac4ed54d8542993080c", 686), builderAsset("4e0ef501ab547b3d6825433faa054defa26f37b0", 414)],
    imageWidths: [207, 343, 207],
  }),
  "alabaster-gloss-edge-tape": edgeTape({
    code: "VW63004",
    color: "#F8F8F8",
    images: [builderAsset("be4aec52573724c28c722c0420967b0b35c36fd5", 414), builderAsset("a3205f850e871e4e3b5df2eb37371b5f03b3466e", 686), builderAsset("71b8a749d6486366d54247ce694cec79587271aa", 414)],
    imageWidths: [207, 343, 207],
  }),
  "olive-super-matt-edge-tape": edgeTape({
    code: "VW63841M",
    color: "#ACB8AA",
    images: [builderAsset("266f2f3320e3bbf1941935643e8ba2e01159c973", 408), builderAsset("4ea46c49f32faad24a7ccd30b640cac9b98e538d", 364), builderAsset("fa476730e751063d79a00e7c74a22da58822b986", 320)],
    imageWidths: [204, 182, 160],
  }),
  "shiny-white-gloss-edge-tape": edgeTape({
    code: "VW853",
    color: "#D3D3D3",
    images: [builderAsset("fd537a7b82a94825fa87a3bf785874ffe3cf7994", 686), builderAsset("b9a7aa115e7f81e1f97eaa574804e96ca207089e", 650)],
    imageWidths: [343, 325],
  }),
  "warm-white-gloss-edge-tape": edgeTape({
    code: "VW007",
    color: "#F9F9F9",
    images: [builderAsset("6de238b81b982744f687c54d35ceec50310c1906", 650), builderAsset("782d7b0a1186b797093e0bae7749f931cd6133d1", 1176)],
    imageWidths: [325, 588],
  }),
  "diamond-grey-gloss-edge-tape": edgeTape({
    code: "VW1087",
    color: "#535353",
    images: [builderAsset("6de238b81b982744f687c54d35ceec50310c1906", 650), builderAsset("782d7b0a1186b797093e0bae7749f931cd6133d1", 1176)],
    imageWidths: [325, 588],
  }),
  "raven-black-matt-edge-tape": edgeTape({
    code: "VW006SM",
    color: "#2B2A28",
    // The first image was supplied as a separate 243 x 243 frame and fills the slot left empty in the page frame.
    images: [builderAsset("949571d2d274d0d01985c84e8a54049047d452ce", 486), builderAsset("c6a1db9f3c9ad31896be5e526c3e798b59d6705c", 606), builderAsset("7e2ac78a2abd74ab8d58060e9fc39d5cd2fb7c56", 490)],
    imageWidths: [243, 303, 245],
  }),
  "snow-white-matt-edge-tape": edgeTape({
    code: "VW806SM",
    color: "#FCFBF7",
    images: [builderAsset("4b0bc782f7c09de90fe205a44b57c964e58d6776", 468), builderAsset("d6700393e5f808766da5fb7f12cc0dffb6cee0ef", 594), builderAsset("e383fbcae8051a4c779ff93d3f9caaad26d0862c", 642)],
    imageWidths: [234, 297, 321],
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
    "code": "VW63004",
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
    "surfaceDesc": "Bring a clean, modern look to your interiors with the Shiny White Gloss MDF board from the Vwood Beyond range. Its UV-cured glossy white finish offers a refined, reflective appearance, making it ideally suited to contemporary kitchens, wardrobes and furniture.",
    "features": [
      "SCRATCH RESISTANT",
      "ANTI-FINGERPRINT",
      "EASY-CLEAN SURFACE"
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
    "surfaceDesc": "A creamier, warmer take on classic white gloss, this UV-cured acrylic surface adds a soft glow without the clinical edge of a cool white. Well suited to kitchens and bathrooms seeking a bright yet inviting finish.",
    "features": [
      "UV-CURED HIGH-GLOSS TOPCOAT",
      "WARM, INVITING TONE"
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
    "surfaceDesc": "A sophisticated charcoal-grey with a fine, subtly flecked surface that catches the light without an overt shine. Its soft, tactile texture is ideal for walk-in wardrobes, dressing rooms and feature joinery wanting a refined, textural neutral.",
    "features": [
      "FINE FLECKED SURFACE TEXTURE",
      "SOPHISTICATED NEUTRAL GREY",
      "DURABLE & EASY TO MAINTAIN"
    ],
    "color": "#535353",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/f934ec774ada9e0ebcb71b0494ed9c0f653c38ba?width=650"
    ],
    "imageWidths": [
      325
    ]
  },
  "raven-black-matt": {
    "code": "VW006SM",
    "surfaceDesc": "A deep, velvety black matt finish that brings drama and depth without the glare of gloss. A striking choice for kitchen islands, wardrobe fronts and feature joinery in bold, contemporary interiors.",
    "features": [
      "DEEP MATT BLACK FINISH",
      "SMUDGE & FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH TIMBER & BRASS ACCENTS"
    ],
    "color": "#2B2A28",
    "sizes": [
      "2440x1220",
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/949571d2d274d0d01985c84e8a54049047d452ce?width=486",
      "https://api.builder.io/api/v1/image/assets/TEMP/c6a1db9f3c9ad31896be5e526c3e798b59d6705c?width=606",
      "https://api.builder.io/api/v1/image/assets/TEMP/7e2ac78a2abd74ab8d58060e9fc39d5cd2fb7c56?width=490"
    ],
    "imageWidths": [
      243,
      303,
      245
    ],
    "icons": "https://api.builder.io/api/v1/image/assets/TEMP/abf2b002d3e087e266bf2dd0d15e2006dd78efd3?width=772"
  },
  "snow-white-matt": {
    "code": "VW806SM",
    "surfaceDesc": "A pure, soft white matt surface that feels clean and effortless in any space. Its non-reflective finish is a versatile everyday choice for kitchen cabinetry, wardrobes and built-in furniture.",
    "features": [
      "SOFT-TOUCH MATT SURFACE",
      "EASY TO MAINTAIN",
      "TRUE NEUTRAL WHITE"
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
    "surfaceDesc": "A soft, honey-toned maple woodgrain that brings a light, natural warmth to kitchens, wardrobes and furniture. Its gentle grain pattern suits both classic and contemporary interiors looking for a subtle timber feel.",
    "features": [
      "NATURAL LIGHT TIMBER TONE",
      "REALISTIC WOODGRAIN TEXTURE",
      "SCRATCH & MOISTURE RESISTANT"
    ],
    "color": "#EEE",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/650092f83c2896714cd8431591de63452ef0bde3?width=436"
    ],
    "imageWidths": [
      218
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/ba870cc88924decb179a54317651c032fbb62e92?width=1084"
  },
  "natural-brown": {
    "code": "VW9E1633-8",
    "surfaceDesc": "An earthy mid-brown woodgrain that captures the warmth of natural timber in a durable, low-maintenance melamine surface. A versatile, everyday choice for cabinetry and furniture across residential and commercial spaces.",
    "features": [
      "WARM MID-TONE WOODGRAIN",
      "HARD-WEARING MELAMINE FINISH",
      "CONSISTENT COLOUR ACROSS SHEETS"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/c73123d4f05fd452e44c1292016917fbb10429cf?width=646"
    ],
    "imageWidths": [
      323
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/e650b5052954d635c75389bc24f5715ed10e7fa0?width=1082"
  },
  "oak-wood-natural": {
    "code": "VW9E1633-7",
    "surfaceDesc": "A pale, driftwood-grey woodgrain with a soft, weathered character and gentle embossed texture — perfect for coastal-inspired kitchens and islands. Its light tone pairs beautifully with black hardware and dark benchtops for striking contrast.",
    "features": [
      "PALE, DRIFTWOOD-GREY TONE",
      "SOFT EMBOSSED WOODGRAIN TEXTURE",
      "DURABLE, LOW-MAINTENANCE SURFACE"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/6f59f0f8d55f76198d2aa12aff80edc7d939cf81?width=484"
    ],
    "imageWidths": [
      242
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/00bf36736bc1de666bfd58e3ae63c9ba96ebae84?width=1082"
  },
  "grey-wood-natural": {
    "code": "VW9F0203-1",
    "surfaceDesc": "A rich, deep brown-grey woodgrain with strong directional texture, bringing depth and drama to feature cabinetry and joinery. A striking option for pairing with lighter timber tones and matt black hardware.",
    "features": [
      "BOLD DIRECTIONAL WOODGRAIN TEXTURE",
      "DEEP, DRAMATIC TONE",
      "DURABLE MELAMINE SURFACE"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/578e9aab80d0fd92aed3ffe2aa5774b362b99f77?width=686",
      "https://api.builder.io/api/v1/image/assets/TEMP/05d2f709d4798747e22a0cb90bd4376ca0fe0c1f?width=846"
    ],
    "imageWidths": [
      343,
      423
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/7d99abf882905bf930d5d486d516c746891e1053?width=1082"
  },
  "southern-oakwood": {
    "code": "VW8E1640-16",
    "surfaceDesc": "A richly textured oak woodgrain with warm honey and caramel tones, ideal for creating a rustic yet refined feel in kitchens, feature walls and cabinetry. The pronounced grain adds tactile depth to any design.",
    "features": [
      "DEEP RUSTIC WOODGRAIN TEXTURE",
      "WARM HONEY-OAK TONE",
      "HARD-WEARING MELAMINE CORE"
    ],
    "color": "#F9F9F9",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/71f5303069bcaf322acf9743bcc11781e4bbc81c?width=654",
      "https://api.builder.io/api/v1/image/assets/TEMP/d23cfc7edca22189718bee7e399a84d4b3833a72?width=846",
      "https://api.builder.io/api/v1/image/assets/TEMP/76f6bab5d01d4c1b47a7843daf79f2d9ffc991a7?width=484"
    ],
    "imageWidths": [
      327,
      423,
      242
    ],
    "showFeatureIcons": false
  },
  "washed-maple-wood-natural": {
    "code": "VW8E516-2",
    "surfaceDesc": "A gently weathered maple finish with a soft, washed-out tone that adds relaxed, coastal charm to interiors. Well suited to bedroom furniture, wardrobes and light, airy kitchen designs.",
    "features": [
      "SOFT, WASHED TIMBER TONE",
      "SUBTLE NATURAL GRAIN",
      "DURABLE MELAMINE SURFACE"
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
    "surfaceDesc": "A muted grey-green woodgrain that brings a calm, earthy character to modern cabinetry and furniture. Its understated tone works beautifully alongside brass, black and natural stone accents.",
    "features": [
      "MUTED, EARTHY WOODGRAIN TONE",
      "ON-TREND CONTEMPORARY PALETTE",
      "SCRATCH & MOISTURE RESISTANT"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/f269b09419b82f4673259317705b50398335066c?width=566"
    ],
    "imageWidths": [
      283
    ],
    "showFeatureIcons": false,
    "hero": mossGreyWood
  },
  "washed-oakwood": {
    "code": "VW8E0718-2",
    "surfaceDesc": "A pale, sun-bleached oak woodgrain with a relaxed, driftwood character, perfect for coastal or Hamptons-style kitchens and furniture. Its light tone helps open up smaller spaces.",
    "features": [
      "PALE, DRIFTWOOD-INSPIRED TONE",
      "VISIBLE NATURAL GRAIN TEXTURE",
      "DURABLE, LOW-MAINTENANCE SURFACE"
    ],
    "color": "#FCFBF7",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/df1ce66dfff70fcc27e775805137f0c8ed4471ab?width=600",
      "https://api.builder.io/api/v1/image/assets/TEMP/5714c853f3de214e9641595bec786755bf80b1f8?width=602",
      "https://api.builder.io/api/v1/image/assets/TEMP/214d5b1c5e404c4edbc86ca35182ca695fc2876a?width=606"
    ],
    "imageWidths": [
      300,
      301,
      303
    ],
    "showFeatureIcons": false
  },
  "classic-walnut": {
    "code": "VW9E1128-3",
    "surfaceDesc": "A deep, chocolate-brown woodgrain with rich walnut character, bringing warmth and heritage charm to cabinetry, shelving and feature panelling. The realistic melamine grain adds texture and depth without the cost or upkeep of solid timber.",
    "features": [
      "AUTHENTIC WALNUT WOODGRAIN TEXTURE",
      "DURABLE MELAMINE SURFACE",
      "MOISTURE RESISTANT CORE"
    ],
    "color": "#EEE",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/0534ae14cc9621bd0e00277bbed8f18b73e1bcbf?width=600",
      "https://api.builder.io/api/v1/image/assets/TEMP/8d946c4fb75599be6c21bee90a180c984c23cf17?width=600"
    ],
    "imageWidths": [
      300,
      300
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/e1e6d6ebc4f9544cacd399fa3435070cb103a954?width=1082"
  },
  "rural-oak": {
    "code": "VW8E0718-11N",
    "surfaceDesc": "A warm, rustic oak woodgrain with a strong, characterful grain pattern that brings country-style warmth to kitchens, dining furniture and joinery. A popular choice for farmhouse and transitional interiors.",
    "features": [
      "BOLD, RUSTIC OAK GRAIN",
      "HARD-WEARING MELAMINE SURFACE",
      "WARM, INVITING TONE"
    ],
    "color": "#EEE",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/525f9bcbdc9dffdec18377c2ac39bb51b7a2763d?width=678"
    ],
    "imageWidths": [
      339
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/5f84b93d6cb387c3c727834cfac11aa45461979a?width=1084"
  },
  "maple-shadow": {
    "code": "VW9F0206-2",
    "surfaceDesc": "A soft, oatmeal-toned woodgrain with a gentle, subtle grain that brings warmth to a space without overwhelming it. A versatile choice for kitchens and dining furniture wanting a calm, contemporary neutral.",
    "features": [
      "SOFT OATMEAL-TONED WOODGRAIN",
      "SUBTLE, GENTLE GRAIN DETAIL",
      "VERSATILE NEUTRAL PALETTE"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/b5444e54b2f41bf2197ced8579c0cc29ac17e36a?width=646"
    ],
    "imageWidths": [
      323
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/5f3c5ee75ced3ea5e62546e81d755a313cc431cc?width=1082"
  },
  "golden-oak": {
    "code": "VW9E1532-3",
    "surfaceDesc": "A warm, honey-brown woodgrain with visible knots and rustic character, bringing the look of reclaimed timber to cabinetry and feature panelling. Ideal for farmhouse-style kitchens, feature walls and furniture wanting a lived-in, natural warmth.",
    "features": [
      "RUSTIC HONEY-BROWN WOODGRAIN",
      "VISIBLE NATURAL KNOTS & CHARACTER",
      "HARD-WEARING MELAMINE SURFACE"
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
    "surfaceDesc": "A rich, deep brown woodgrain with subtle grey undertones, bringing grounded elegance to cabinetry and feature joinery. A striking option for pairing with matt black hardware and warm lighting.",
    "features": [
      "DEEP, GROUNDED BROWN TONE",
      "SUBTLE TEXTURED GRAIN",
      "DURABLE MELAMINE SURFACE"
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
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/8a157a50bfe13e1822c8d889914dd09fc46c75af?width=1094"
  },
  "sand-dune": {
    "code": "VW9F25177Z-4",
    "surfaceDesc": "A soft, sandy neutral woodgrain that bridges warm and cool tones, offering a versatile backdrop for cabinetry, furniture and feature panels across a range of interior styles.",
    "features": [
      "VERSATILE, SANDY NEUTRAL TONE",
      "SUBTLE NATURAL GRAIN",
      "HARD-WEARING & EASY TO CLEAN"
    ],
    "color": "#F3F3F3",
    "sizes": [
      "2800x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/40b035a0a58b6810418cb773e7b43b13c1b5ff9d?width=378",
      "https://api.builder.io/api/v1/image/assets/TEMP/049a628d10084c705208e727bba40cc05eaea033?width=800",
      "https://api.builder.io/api/v1/image/assets/TEMP/d81edef993b472e047679bfadd7fd0f6b472eccd?width=458"
    ],
    "imageWidths": [
      189,
      400,
      229
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/36fe224b2a0be6ccbc1e48d3f34fff0e3fde2e8f?width=1082"
  },
  "prime-oak": {
    "code": "VW9E47183",
    "surfaceDesc": "A refined, premium-grade oak woodgrain with clean, consistent grain detail, suited to high-end cabinetry, joinery and furniture wanting a polished natural timber look.",
    "features": [
      "PREMIUM, CONSISTENT OAK GRAIN",
      "DURABLE MELAMINE SURFACE",
      "SUITS HIGH-END JOINERY & FURNITURE"
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
    "surfaceDesc": "A soft, honey-toned oak woodgrain with a fine, straight grain pattern that brings warm, natural character to kitchens and cabinetry. Its gentle, sun-warmed tone pairs beautifully with soft neutral tiles and brushed metal hardware for an understated, timeless kitchen.",
    "features": [
      "SOFT HONEY-OAK TONE",
      "FINE, CONSISTENT GRAIN PATTERN",
      "DURABLE, LOW-MAINTENANCE MELAMINE SURFACE"
    ],
    "color": "#D3D3D3",
    "sizes": [
      "2880x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/37a1e69f8faa041424e0b4ddc8ae7fc336d9574e?width=738",
      "https://api.builder.io/api/v1/image/assets/TEMP/fd859f72db53bc07df5c44291a78409272a361b0?width=328"
    ],
    "imageWidths": [
      369,
      164
    ],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/787a57bdebe8f28955ac757ea2dcac3f06126ef5?width=1082"
  },
  "anthracite": {
    "code": "VW936SM",
    "surfaceDesc": "A smooth, soft matte charcoal-grey with a clean, contemporary surface and minimal visible grain — a sleek neutral that pairs beautifully with black hardware and warm timber accents. A versatile choice for kitchen drawers, cabinetry and joinery wanting a modern, understated finish.",
    "features": [
      "SMOOTH, SOLID MATT SURFACE",
      "FINGERPRINT & SMUDGE RESISTANT",
      "VERSATILE CONTEMPORARY GREY"
    ],
    "color": "#424443",
    "sizes": [
      "2440x1220"
    ],
    "images": [
      "https://api.builder.io/api/v1/image/assets/TEMP/f4f2d96b873632d2e1d7ddf1a1147b657822833d?width=602",
      "https://api.builder.io/api/v1/image/assets/TEMP/8e18ab1e59213d4766fed1449f525e9ec0c52bb4?width=606",
      "https://api.builder.io/api/v1/image/assets/TEMP/599a4394c7628cea335ab8d71dc34d940435b827?width=748"
    ],
    "imageWidths": [
      301,
      303,
      374
    ],
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
  "wb-0240-c": {
    "code": "WB.0240.C",
    "surfaceDesc": "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    "features": [
      "SMOOTH, LOW-GLARE MATT FINISH",
      "FINGERPRINT RESISTANT",
      "PAIRS BEAUTIFULLY WITH BRASS & GOLD HARDWARE"
    ],
    "color": "#FFF",
    "sizes": [
      "W(365)XD(500)XH(400mm)"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/ae1e35e20dd4ca404b6d1e3da381891717cff501?width=526",
    "sizeNote": "For 400mm Cabinet, 18L+18L",
    "colorName": "Grey",
    "finishName": "Steel+Plastic"
  },
  "wb-0240-a": {
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
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/6dbc4b3ff29cb268bf544714f079133f8b7528ab?width=1110",
    "sizeNote": "For 300mm Cabinet, 18L+6Lr",
    "colorName": "Grey",
    "finishName": "Steel+Plastic"
  },
  // From the bin product sheet; the sheet supplies no product photo.
  "wb-0240-e": {
    "code": "WB.0240.E",
    "surfaceDesc": "",
    "features": [],
    "color": "#FFF",
    "sizes": [
      "W(415)XD(500)XH(500mm)"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/c7502135c96a6738ead73457696ceadd56acb45b?width=1098",
    "sizeNote": "For 450mm Cabinet, 30L+30L",
    "colorName": "Grey",
    "finishName": "Steel+Plastic"
  },
  // From the bin product sheet; the sheet supplies no product photo.
  "wb-0143": {
    "code": "WB.0143",
    "surfaceDesc": "",
    "features": [],
    "color": "#FFF",
    "sizes": [
      "W(340)XD(480)XH(425mm)"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/28dc7ee5145c8995a626ca677ef79bf9901b5411?width=1082",
    "sizeNote": "For 400mm Cabinet, 20L+20L",
    "colorName": "Grey",
    "finishName": "Steel+Plastic"
  },
  // Round bin from the product sheet. Only the sheet's fields are filled; it gives no copy or features.
  "wb-0144": {
    "code": "WB.0144",
    "surfaceDesc": "",
    "features": [],
    "color": "#FFF",
    "sizes": [
      "R(255)XL(310)XH(330mm)"
    ],
    "images": [],
    "imageWidths": [],
    "showFeatureIcons": false,
    "hero": "https://api.builder.io/api/v1/image/assets/TEMP/65934b9cca13f28f0f8f3cd92cf08b14c9b1688b?width=1098",
    "colorName": "Black+White+Chrome",
    "finishName": "Stainless Steel+Plastic"
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
