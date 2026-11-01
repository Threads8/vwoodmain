import { createFileRoute } from "@tanstack/react-router";
import { KitchenStep } from "@/components/kitchen/KitchenStep";
import { SelectionSummary } from "@/components/kitchen/SelectionSummary";

export const Route = createFileRoute("/kitchen-design_/summary")({
  head: () => ({
    meta: [
      { title: "Your Kitchen, Your Selection — Kitchen Design | Vwood" },
      { name: "description", content: "Step 5: review your kitchen selections." },
    ],
  }),
  component: SummaryStep,
});

function SummaryStep() {
  return (
    <KitchenStep
      step={5}
      title="Your Kitchen, Your Selection."
      subtitle="Review your selected kitchen style and materials before submitting your inquiry."
      preview="full"
    >
      <SelectionSummary />
    </KitchenStep>
  );
}
