import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductStep } from "@/components/kitchen/ProductStep";
import { sortTapesByBoards, TAPES } from "@/config/tapes";
import { useKitchenStore } from "@/stores/kitchenStore";

export const Route = createFileRoute("/kitchen-design_/tapes")({
  head: () => ({
    meta: [
      { title: "Find the Perfect Matching Tape — Kitchen Design | Vwood" },
      { name: "description", content: "Step 4: choose edge tapes that complement your boards." },
    ],
  }),
  component: TapesStep,
});

function TapesStep() {
  const boards = useKitchenStore((state) => state.boards);
  const tapes = useKitchenStore((state) => state.tapes);
  const toggleTape = useKitchenStore((state) => state.toggleTape);
  const items = useMemo(() => sortTapesByBoards(TAPES, boards), [boards]);

  return (
    <ProductStep
      step={4}
      title="Find the Perfect Matching Tape"
      subtitle="Explore our tape collection and discover finishes that complement your selected board."
      noun="tape"
      items={items}
      selected={tapes}
      onToggle={toggleTape}
      isMatch={(tape) => boards.includes(tape.boardId)}
    />
  );
}
