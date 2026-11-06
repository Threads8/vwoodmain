import { Link, useNavigate } from "@tanstack/react-router";
import { useId, type ReactNode } from "react";
import { KITCHEN_HOME, skippableStep, stepPath, type StepNumber } from "@/config/kitchenSteps";
import { useKitchenStore } from "@/stores/kitchenStore";

export function StepNav({
  step,
  canContinue = true,
  hint = "Select at least one option",
  primary,
}: {
  step: StepNumber;
  canContinue?: boolean;
  hint?: string;
  /** Replaces Continue, for the quote form's submit button. */
  primary?: ReactNode;
}) {
  const navigate = useNavigate();
  const hintId = useId();
  const skipStep = useKitchenStore((state) => state.skipStep);
  const back = step === 1 ? KITCHEN_HOME : stepPath((step - 1) as StepNumber);
  const next = stepPath((step + 1) as StepNumber);
  // Only the choice steps (layout, cabinet style, boards, tapes) can be skipped.
  const skipKey = primary ? undefined : skippableStep(step);

  return (
    <div className="kc-nav">
      <div className="kc-nav-actions">
        <Link to={back} className="kc-button kc-button--secondary">
          Back
        </Link>
        {skipKey && (
          <button
            type="button"
            onClick={() => {
              skipStep(skipKey);
              void navigate({ to: next });
            }}
            className="kc-button kc-button--skip"
          >
            Skip
          </button>
        )}
        {primary ?? (
          <button
            type="button"
            aria-disabled={!canContinue}
            aria-describedby={canContinue ? undefined : hintId}
            onClick={() => {
              if (canContinue) void navigate({ to: next });
            }}
            className="kc-button kc-button--primary"
          >
            Continue
          </button>
        )}
      </div>
      {!primary && (
        <p id={hintId} aria-live="polite" className="kc-nav-hint">
          {canContinue ? "" : skipKey ? `${hint}, or skip this step` : hint}
        </p>
      )}
    </div>
  );
}
