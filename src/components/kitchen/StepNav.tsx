import { Link, useNavigate } from "@tanstack/react-router";
import { useId, type ReactNode } from "react";
import { KITCHEN_HOME, stepPath, type StepNumber } from "@/config/kitchenSteps";

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
  const back = step === 1 ? KITCHEN_HOME : stepPath((step - 1) as StepNumber);

  return (
    <div className="kc-nav">
      <div className="kc-nav-actions">
        <Link to={back} className="kc-button kc-button--secondary">
          Back
        </Link>
        {primary ?? (
          <button
            type="button"
            aria-disabled={!canContinue}
            aria-describedby={canContinue ? undefined : hintId}
            onClick={() => {
              if (canContinue) void navigate({ to: stepPath((step + 1) as StepNumber) });
            }}
            className="kc-button kc-button--primary"
          >
            Continue
          </button>
        )}
      </div>
      {!primary && (
        <p id={hintId} aria-live="polite" className="kc-nav-hint">
          {canContinue ? "" : hint}
        </p>
      )}
    </div>
  );
}
