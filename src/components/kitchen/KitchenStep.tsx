import { useEffect, useRef, type ReactNode } from "react";
import { Page } from "@/components/site/Layout";
import type { StepNumber } from "@/config/kitchenSteps";
import { PlanPreview } from "./PlanPreview";
import { RouteGuard } from "./RouteGuard";
import { StepProgress } from "./StepProgress";

function StepHeading({
  title,
  subtitle,
  variant,
}: {
  title: string;
  subtitle?: string | undefined;
  variant: "center" | "quote";
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <header className={`kc-heading kc-heading--${variant}`}>
      <h1 ref={heading} tabIndex={-1} className="text-h1">
        {title}
      </h1>
      {subtitle && <p className="text-lead">{subtitle}</p>}
    </header>
  );
}

export function KitchenStep({
  step,
  title,
  subtitle,
  preview = "none",
  variant = "center",
  children,
}: {
  step: StepNumber;
  title: string;
  subtitle?: string;
  preview?: "none" | "side" | "full";
  variant?: "center" | "quote";
  children: ReactNode;
}) {
  return (
    <Page>
      <section className="site-section kc-page">
        <div className="site-container">
          <div className="kc-panel">
            <RouteGuard step={step}>
              <StepProgress step={step} />
              <StepHeading title={title} subtitle={subtitle} variant={variant} />
              <div className={`kc-body kc-body--${preview}`}>
                {preview !== "none" && <PlanPreview fullWidth={preview === "full"} />}
                <div className="kc-main">{children}</div>
              </div>
            </RouteGuard>
          </div>
        </div>
      </section>
    </Page>
  );
}
