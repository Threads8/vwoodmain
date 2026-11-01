import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { isCabinetStyle, isLayout, type CabinetStyle, type Layout } from "@/config/kitchenOptions";
import { PRODUCTS } from "@/config/products";
import { TAPES } from "@/config/tapes";

export interface KitchenState {
  layouts: Layout[];
  cabinetStyles: CabinetStyle[];
  boards: string[];
  tapes: string[];
  activeLayout: Layout | null;
  activeCabinetStyle: CabinetStyle | null;
  toggleLayout(id: Layout): void;
  toggleCabinetStyle(id: CabinetStyle): void;
  toggleBoard(id: string): void;
  toggleTape(id: string): void;
  setActiveLayout(id: Layout): void;
  reset(): void;
}

export type KitchenSelections = Pick<
  KitchenState,
  "layouts" | "cabinetStyles" | "boards" | "tapes" | "activeLayout" | "activeCabinetStyle"
>;

const EMPTY: KitchenSelections = {
  layouts: [],
  cabinetStyles: [],
  boards: [],
  tapes: [],
  activeLayout: null,
  activeCabinetStyle: null,
};

const SERVER_STORAGE: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const toggled = <T>(list: T[], id: T) =>
  list.includes(id) ? list.filter((item) => item !== id) : [...list, id];

/** The clicked item becomes active; deselecting the active one falls back to the last remaining. */
function nextActive<T>(previous: T[], next: T[], id: T, active: T | null): T | null {
  if (next.length > previous.length) return id;
  return active === id ? (next.at(-1) ?? null) : active;
}

export const useKitchenStore = create<KitchenState>()(
  persist(
    (set) => ({
      ...EMPTY,
      toggleLayout: (id) =>
        set((state) => {
          const layouts = toggled(state.layouts, id);
          return {
            layouts,
            activeLayout: nextActive(state.layouts, layouts, id, state.activeLayout),
          };
        }),
      toggleCabinetStyle: (id) =>
        set((state) => {
          const cabinetStyles = toggled(state.cabinetStyles, id);
          return {
            cabinetStyles,
            activeCabinetStyle: nextActive(
              state.cabinetStyles,
              cabinetStyles,
              id,
              state.activeCabinetStyle,
            ),
          };
        }),
      toggleBoard: (id) => set((state) => ({ boards: toggled(state.boards, id) })),
      toggleTape: (id) => set((state) => ({ tapes: toggled(state.tapes, id) })),
      setActiveLayout: (id) => set({ activeLayout: id }),
      reset: () => set(EMPTY),
    }),
    {
      name: "vwood-kitchen",
      // Persist drops its API when storage is unavailable, so the server gets a stand-in.
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? SERVER_STORAGE : sessionStorage,
      ),
      // Rehydrated from useKitchenHydrated so the server and first client render agree.
      skipHydration: true,
      partialize: ({
        layouts,
        cabinetStyles,
        boards,
        tapes,
        activeLayout,
        activeCabinetStyle,
      }) => ({
        layouts,
        cabinetStyles,
        boards,
        tapes,
        activeLayout,
        activeCabinetStyle,
      }),
      // Drop anything no longer valid, such as a product removed from the catalog.
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<KitchenSelections>;
        const layouts = (saved.layouts ?? []).filter(isLayout);
        const cabinetStyles = (saved.cabinetStyles ?? []).filter(isCabinetStyle);
        return {
          ...current,
          layouts,
          cabinetStyles,
          boards: (saved.boards ?? []).filter((id) => PRODUCTS.some((item) => item.id === id)),
          tapes: (saved.tapes ?? []).filter((id) => TAPES.some((item) => item.id === id)),
          activeLayout:
            saved.activeLayout && layouts.includes(saved.activeLayout)
              ? saved.activeLayout
              : (layouts.at(-1) ?? null),
          activeCabinetStyle:
            saved.activeCabinetStyle && cabinetStyles.includes(saved.activeCabinetStyle)
              ? saved.activeCabinetStyle
              : (cabinetStyles.at(-1) ?? null),
        };
      },
    },
  ),
);

/** Clears the selections and the saved session copy, for after a quote is sent. */
export function clearKitchenSession() {
  useKitchenStore.getState().reset();
  useKitchenStore.persist.clearStorage();
}

export function useKitchenHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() => useKitchenStore.persist.hasHydrated());

  useEffect(() => {
    if (hydrated) return;
    let active = true;
    // `finally` also releases the page if sessionStorage is blocked.
    void Promise.resolve(useKitchenStore.persist.rehydrate()).finally(() => {
      if (active) setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, [hydrated]);

  return hydrated;
}
