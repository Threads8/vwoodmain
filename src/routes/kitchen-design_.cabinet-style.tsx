import { createFileRoute } from "@tanstack/react-router";
import { CabinetCard } from "@/components/kitchen/CabinetCard";
import { KitchenStep } from "@/components/kitchen/KitchenStep";
import { StepNav } from "@/components/kitchen/StepNav";
import { CABINET_STYLES } from "@/config/kitchenOptions";
import { useKitchenStore } from "@/stores/kitchenStore";

export const Route = createFileRoute("/kitchen-design_/cabinet-style")({
  head: () => ({
    meta: [
      { title: "Select Your Cabinet Style — Kitchen Design | Vwood" },
      { name: "description", content: "Step 2: choose a cabinet design for your kitchen." },
    ],
  }),
  component: CabinetStyleStep,
});

function CabinetStyleStep() {
  const cabinetStyles = useKitchenStore((state) => state.cabinetStyles);
  const toggleCabinetStyle = useKitchenStore((state) => state.toggleCabinetStyle);

  return (
    <KitchenStep
      step={2}
      title="Select Your Cabinet Style"
      subtitle="Choose a cabinet design that complements the overall look of your kitchen"
      preview="side"
    >
      <div className="kc-options">
        {CABINET_STYLES.map((option) => (
          <CabinetCard
            key={option.id}
            option={option}
            selected={cabinetStyles.includes(option.id)}
            onToggle={() => toggleCabinetStyle(option.id)}
          />
        ))}
      </div>
      <StepNav
        step={2}
        canContinue={cabinetStyles.length > 0}
        hint="Select at least one cabinet style"
      />
    </KitchenStep>
  );
}
