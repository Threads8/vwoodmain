import { createFileRoute } from "@tanstack/react-router";
import { ProductStep } from "@/components/kitchen/ProductStep";
import { PRODUCTS } from "@/config/products";
import { useKitchenStore } from "@/stores/kitchenStore";

export const Route = createFileRoute("/kitchen-design_/boards")({
  head: () => ({
    meta: [
      { title: "Explore Our Board Collection — Kitchen Design | Vwood" },
      { name: "description", content: "Step 3: choose the boards for your kitchen." },
    ],
  }),
  component: BoardsStep,
});

function BoardsStep() {
  const boards = useKitchenStore((state) => state.boards);
  const toggleBoard = useKitchenStore((state) => state.toggleBoard);

  return (
    <ProductStep
      step={3}
      title="Explore Our Board Collection."
      subtitle="Discover a wide range of boards in different colours, textures and finishes to create your preferred kitchen look."
      noun="board"
      items={PRODUCTS}
      selected={boards}
      onToggle={toggleBoard}
    />
  );
}
