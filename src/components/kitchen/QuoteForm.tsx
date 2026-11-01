import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import samples from "@/assets/contact-samples.png";
import { ENQUIRY_EMAIL } from "@/lib/enquiry";
import { KITCHEN_HOME } from "@/config/kitchenSteps";
import {
  buildSelectionMessage,
  QUOTE_CATEGORIES,
  quoteSchema,
  submitQuote,
  type QuoteFields,
} from "@/lib/kitchen-quote";
import {
  clearKitchenSession,
  useKitchenStore,
  type KitchenSelections,
} from "@/stores/kitchenStore";
import { StepNav } from "./StepNav";

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`kc-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      <p id={`${id}-error`} aria-live="polite" className="kc-field-error">
        {error}
      </p>
    </div>
  );
}

function selectionsFromStore(): KitchenSelections {
  const { layouts, cabinetStyles, boards, tapes, activeLayout, activeCabinetStyle } =
    useKitchenStore.getState();
  return { layouts, cabinetStyles, boards, tapes, activeLayout, activeCabinetStyle };
}

function QuoteSuccess() {
  const message = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    message.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="kc-success">
      <h2 ref={message} tabIndex={-1} className="text-h3">
        Thanks! Our team will contact you within 24 hours.
      </h2>
      <Link to={KITCHEN_HOME} className="kc-button kc-button--primary">
        Back to Home
      </Link>
    </div>
  );
}

export function QuoteForm() {
  const [selections] = useState(selectionsFromStore);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const baseId = useId();
  const formId = `${baseId}-form`;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFields>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      category: "",
      message: buildSelectionMessage(selections),
    },
  });
  const selectionSummary = JSON.stringify(selections);

  const onSubmit = async (fields: QuoteFields) => {
    setFailed(false);
    try {
      await submitQuote({ ...fields, selectionSummary });
      setSent(true);
      clearKitchenSession();
    } catch {
      setFailed(true);
    }
  };

  if (sent) return <QuoteSuccess />;

  const fieldProps = (name: keyof QuoteFields) => {
    const id = `${baseId}-${name}`;
    const error = errors[name]?.message;
    return {
      id,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
    };
  };

  return (
    <>
      <div className="kc-quote">
        <form
          id={formId}
          noValidate
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="kc-quote-form"
        >
          <input type="hidden" name="selectionSummary" value={selectionSummary} />
          <Field id={`${baseId}-fullName`} label="Full Name" error={errors.fullName?.message}>
            <input
              {...register("fullName")}
              {...fieldProps("fullName")}
              autoComplete="name"
              aria-required="true"
            />
          </Field>
          <Field id={`${baseId}-email`} label="Email Address" error={errors.email?.message}>
            <input
              {...register("email")}
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              aria-required="true"
            />
          </Field>
          <Field id={`${baseId}-phone`} label="Phone Number" error={errors.phone?.message}>
            <input
              {...register("phone")}
              {...fieldProps("phone")}
              type="tel"
              autoComplete="tel"
              aria-required="true"
            />
          </Field>
          <Field id={`${baseId}-category`} label="Category" error={errors.category?.message}>
            <select {...register("category")} {...fieldProps("category")} aria-required="true">
              <option value="">Select a category</option>
              {QUOTE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>
          <Field
            id={`${baseId}-message`}
            label="Message"
            error={errors.message?.message}
            className="kc-field--wide"
          >
            <textarea {...register("message")} {...fieldProps("message")} rows={8} />
          </Field>
        </form>
        <div className="kc-quote-side">
          <img src={samples} alt="Kitchen plans with timber board samples" loading="lazy" />
          <address className="kc-quote-contact">
            <strong>Contact:</strong>
            <span>40 Cryers Road, East Tāmaki, Manukau 2013</span>
            <span>+64 21 191 8843</span>
            <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>
          </address>
        </div>
      </div>
      {failed && (
        <p role="alert" className="kc-quote-failed">
          We couldn't send your inquiry. Please try again.
        </p>
      )}
      <StepNav
        step={6}
        primary={
          <button
            type="submit"
            form={formId}
            aria-busy={isSubmitting}
            disabled={isSubmitting}
            className="kc-button kc-button--primary kc-button--send"
          >
            {isSubmitting ? "Sending…" : "Send Inquiry"}
          </button>
        }
      />
    </>
  );
}
