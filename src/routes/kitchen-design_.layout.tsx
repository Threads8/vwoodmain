import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { KitchenStep } from "@/components/kitchen/KitchenStep";
import { LayoutCard } from "@/components/kitchen/LayoutCard";
import { StepNav } from "@/components/kitchen/StepNav";
import { LAYOUTS } from "@/config/kitchenOptions";
import { planMask, planNeutral } from "@/config/planFinishes";
import { PLAN_IMAGE_FILES } from "@/config/planImages";
import { useKitchenStore } from "@/stores/kitchenStore";

export const Route = createFileRoute("/kitchen-design_/layout")({
  head: () => ({
    meta: [
      { title: "Choose Your Layout — Kitchen Design | Vwood" },
      { name: "description", content: "Step 1: choose the kitchen layout that suits your space." },
    ],
  }),
  component: LayoutStep,
});

function LayoutStep() {
  const layouts = useKitchenStore((state) => state.layouts);
  const toggleLayout = useKitchenStore((state) => state.toggleLayout);

  useEffect(() => {
    for (const src of PLAN_IMAGE_FILES) {
      new Image().src = src;
      new Image().src = planMask(src);
      const neutral = planNeutral(src);
      if (neutral) new Image().src = neutral;
    }
  }, []);

  return (
    <KitchenStep
      step={1}
      title="Let's Start With Your Kitchen"
      subtitle="Choose a layout that best matches your available space and requirements."
      preview="side"
    >
      <div className="kc-options kc-options--wide">
        {LAYOUTS.map((option) => (
          <LayoutCard
            key={option.id}
            option={option}
            selected={layouts.includes(option.id)}
            onToggle={() => toggleLayout(option.id)}
          />
        ))}
      </div>
      <StepNav step={1} canContinue={layouts.length > 0} hint="Select at least one layout" />
    </KitchenStep>
  );
}
