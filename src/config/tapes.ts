import { EDGE_TAPE_PRODUCTS } from "@/lib/edge-tape-products";
import { PRODUCT_DETAILS } from "@/lib/product-details";
import { BOARDS } from "@/lib/site-data";
import { colourFor, materialFor, type CatalogItem } from "./products";

export type TapeItem = CatalogItem & {
  /** Id of the board this tape was made to match. */
  boardId: string;
};

export const TAPES: TapeItem[] = EDGE_TAPE_PRODUCTS.flatMap((tape) => {
  const board = BOARDS.find((item) => item.name === tape.name);
  if (!board) return [];
  return [
    {
      id: `${board.slug}-tape`,
      boardId: board.slug,
      name: tape.name,
      code: PRODUCT_DETAILS[`${board.slug}-edge-tape`]?.code ?? board.code,
      material: materialFor(tape.name, tape.finish),
      finish: tape.finish,
      colour: colourFor(tape.name),
      ...(tape.image ? { image: tape.image } : {}),
      ...(tape.crop ? { crop: tape.crop } : {}),
      swatch: tape.swatch,
      description: tape.desc,
    },
  ];
});

/** Tapes matching a selected board first, keeping catalog order within each group. */
export function sortTapesByBoards(tapes: TapeItem[], boardIds: string[]): TapeItem[] {
  const matches = (tape: TapeItem) => boardIds.includes(tape.boardId);
  return [...tapes.filter(matches), ...tapes.filter((tape) => !matches(tape))];
}
