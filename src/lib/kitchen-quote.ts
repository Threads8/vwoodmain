import { z } from "zod";
import { sendEnquiry } from "./enquiry";
import { cabinetStyleLabel, layoutLabel } from "@/config/kitchenOptions";
import { PRODUCTS, uniqueValues, type CatalogItem } from "@/config/products";
import { TAPES } from "@/config/tapes";
import type { KitchenSelections } from "@/stores/kitchenStore";

export const QUOTE_CATEGORIES = [
  "Complete Kitchen",
  "MDF Board",
  "Edge Tape",
  "Sink",
  "Rubbish Bin",
];

/** A 10-digit Indian mobile number, with or without +91. */
export function isValidMobile(value: string): boolean {
  return /^(?:\+91)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
}

export const quoteSchema = z.object({
  fullName: z.string().trim().min(1, "Enter your full name"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address")
    .email("Enter a valid email address, like name@example.com"),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number")
    .refine(isValidMobile, "Enter a 10-digit mobile number, with or without +91"),
  category: z.string().min(1, "Choose a category"),
  message: z.string(),
});

export type QuoteFields = z.infer<typeof quoteSchema>;

const pick = <T extends CatalogItem>(items: T[], ids: string[]) =>
  ids.flatMap((id) => items.find((item) => item.id === id) ?? []);

export const selectedBoards = (ids: string[]) => pick(PRODUCTS, ids);
export const selectedTapes = (ids: string[]) => pick(TAPES, ids);
export const selectedMaterials = (boardIds: string[]) =>
  uniqueValues(selectedBoards(boardIds).map((board) => board.material));

const describe = (item: CatalogItem) => `${item.name} (${item.code})`;

export function buildSelectionMessage(selections: KitchenSelections): string {
  return [
    "My kitchen selections:",
    `Kitchen layout: ${selections.layouts.map(layoutLabel).join(", ")}`,
    `Cabinet style: ${selections.cabinetStyles.map(cabinetStyleLabel).join(", ")}`,
    `Boards: ${selectedBoards(selections.boards).map(describe).join(", ")}`,
    `Tapes: ${selectedTapes(selections.tapes).map(describe).join(", ")}`,
    `Material: ${selectedMaterials(selections.boards).join(", ")}`,
  ].join("\n");
}

export type QuotePayload = QuoteFields & {
  /** The raw selections, as JSON. */
  selectionSummary: string;
};

/**
 * The one place a quote is sent: emailed to the enquiry inbox (see src/lib/enquiry.ts).
 * Throwing shows the form's error message and keeps the customer's selections.
 */
export async function submitQuote(payload: QuotePayload): Promise<void> {
  await sendEnquiry(`New kitchen quote request — ${payload.fullName}`, {
    Name: payload.fullName,
    Email: payload.email,
    Phone: payload.phone,
    Category: payload.category,
    Message: payload.message,
    "Selections (JSON)": payload.selectionSummary,
  });
}
