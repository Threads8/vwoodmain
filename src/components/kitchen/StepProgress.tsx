import { KITCHEN_STEPS, type StepNumber } from "@/config/kitchenSteps";

export function StepProgress({ step }: { step: StepNumber }) {
  const total = KITCHEN_STEPS.length;
  return (
    <div className="kc-progress">
      <p className="kc-progress-label">
        Step {step} of {total}
      </p>
      <div
        role="progressbar"
        aria-label="Kitchen design progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-valuetext={`Step ${step} of ${total}`}
        className="kc-progress-track"
      >
        <span className="kc-progress-bar" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}
