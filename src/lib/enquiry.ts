/**
 * Every enquiry form on the site is delivered by email to this inbox.
 *
 * Delivery uses FormSubmit (https://formsubmit.co). The request is made by a server function so
 * provider CORS restrictions cannot prevent the form from being delivered.
 */
import { createServerFn } from "@tanstack/react-start";

export const ENQUIRY_EMAIL = "vwoodishaan@gmail.com";

const ENDPOINT = `https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`;

export type EnquiryFields = Record<string, string>;

type EnquiryRequest = {
  subject: string;
  fields: EnquiryFields;
  page: string;
};

const deliverEnquiry = createServerFn({ method: "POST" })
  .validator((data: EnquiryRequest) => {
    if (!data || typeof data.subject !== "string" || !data.subject.trim()) {
      throw new Error("An enquiry subject is required");
    }
    if (!data.fields || typeof data.fields !== "object") {
      throw new Error("Enquiry fields are required");
    }
    return {
      subject: data.subject.trim(),
      fields: data.fields,
      page: typeof data.page === "string" ? data.page : "",
    };
  })
  .handler(async ({ data }) => {
    const replyTo = data.fields["Email"] ?? data.fields["email"];
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data.fields,
        _subject: data.subject,
        _template: "table",
        _captcha: "false",
        ...(replyTo ? { _replyto: replyTo } : {}),
        Page: data.page,
      }),
    });
    const result = (await response.json().catch(() => null)) as {
      success?: string | boolean;
    } | null;
    if (!response.ok || String(result?.success) === "false") {
      throw new Error("The enquiry could not be sent");
    }
  });

export async function sendEnquiry(subject: string, fields: EnquiryFields): Promise<void> {
  await deliverEnquiry({
    data: {
      subject,
      fields,
      page: typeof window === "undefined" ? "" : window.location.href,
    },
  });
}

/** Collects named, non-empty fields from a form, labelled by their `name`. */
export function formFields(form: HTMLFormElement): EnquiryFields {
  const fields: EnquiryFields = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === "string" && value.trim()) fields[key] = value.trim();
  });
  return fields;
}
