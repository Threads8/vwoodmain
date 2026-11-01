import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { findIncompleteStep, stepPath, type StepNumber } from "@/config/kitchenSteps";
import { useKitchenHydrated, useKitchenStore } from "@/stores/kitchenStore";

/**
 * Checks once on arrival rather than on every change: removing the last item on the summary
 * must show a warning there, and clearing the store after a quote must keep the success message.
 */
export function RouteGuard({ step, children }: { step: StepNumber; children: ReactNode }) {
  const hydrated = useKitchenHydrated();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(
    () => hydrated && !findIncompleteStep(step, useKitchenStore.getState()),
  );

  useEffect(() => {
    if (!hydrated || allowed) return;
    const incomplete = findIncompleteStep(step, useKitchenStore.getState());
    if (!incomplete) {
      setAllowed(true);
      return;
    }
    toast(incomplete.message, { id: "kitchen-route-guard" });
    void navigate({ to: stepPath(incomplete.step), replace: true });
  }, [allowed, hydrated, navigate, step]);

  if (!allowed) {
    return (
      <p role="status" className="kc-loading">
        Loading your selections…
      </p>
    );
  }
  return <>{children}</>;
}
