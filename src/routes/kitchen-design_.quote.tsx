import { createFileRoute } from "@tanstack/react-router";
import { KitchenStep } from "@/components/kitchen/KitchenStep";
import { QuoteForm } from "@/components/kitchen/QuoteForm";

export const Route = createFileRoute("/kitchen-design_/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — Kitchen Design | Vwood" },
      { name: "description", content: "Step 6: send us your kitchen selections for a quote." },
    ],
  }),
  component: QuoteStep,
});

function QuoteStep() {
  return (
    <KitchenStep
      step={6}
      title="Request a quote"
      subtitle="Share your renovation dreams with us through form and get free consultation that turn your vision into clear, actionable plan"
      variant="quote"
    >
      <QuoteForm />
    </KitchenStep>
  );
}
