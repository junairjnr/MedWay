import emailjs from "@emailjs/browser";
import { siteContact } from "@/data/site-contact";

function cleanEnv(value: string | undefined): string {
  const v = (value ?? "").trim();
  if (!v || v.startsWith("your_")) return "";
  return v;
}

// Must use static process.env.NEXT_PUBLIC_* references so Next.js inlines them in the client bundle.
const publicKey = cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
const serviceId = cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
const contactTemplateId = cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID);
const inquiryTemplateId = cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_TEMPLATE_ID);
const newsletterTemplateId = cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID);

let initialized = false;

function ensureEmailJsInit() {
  if (!publicKey || initialized) return;
  emailjs.init({ publicKey });
  initialized = true;
}

export type EmailJsTemplate = "contact" | "inquiry" | "newsletter";

function getTemplateId(template: EmailJsTemplate): string {
  if (template === "inquiry") return inquiryTemplateId || contactTemplateId;
  if (template === "newsletter") return newsletterTemplateId || contactTemplateId;
  return contactTemplateId;
}

export function isEmailJsConfigured(template: EmailJsTemplate = "contact"): boolean {
  return Boolean(publicKey && serviceId && getTemplateId(template));
}

function getEmailJsErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "text" in error) {
    const text = String((error as { text?: string }).text ?? "").trim();
    if (text) return text;
  }
  if (error instanceof Error && error.message) return error.message;
  return "Failed to send email.";
}

function enrichEmailJsParams(templateParams: Record<string, string>): Record<string, string> {
  const fromName = templateParams.from_name ?? templateParams.name ?? "";
  const fromEmail = templateParams.from_email ?? templateParams.email ?? "";
  const subject = templateParams.subject ?? templateParams.title ?? "";
  const message = templateParams.message ?? templateParams.content ?? "";

  return {
    to_email: siteContact.email,
    ...templateParams,
    name: fromName,
    user_name: fromName,
    from_name: fromName,
    email: fromEmail,
    user_email: fromEmail,
    from_email: fromEmail,
    title: subject,
    subject,
    content: message,
    message,
  };
}

/** Newsletter signup — same EmailJS flow and template fallback as contact. */
export function buildNewsletterEmailJsParams(subscriberEmail: string): Record<string, string> {
  return {
    from_name: "Newsletter Subscriber",
    from_email: subscriberEmail,
    reply_to: subscriberEmail,
    subject: "Newsletter Subscription",
    category: "Newsletter",
    product_name: "Newsletter",
    message: `New newsletter subscription: ${subscriberEmail}`,
    updates: "Yes",
  };
}

export async function sendEmailJs(
  template: EmailJsTemplate,
  templateParams: Record<string, string>
): Promise<void> {
  const templateId = getTemplateId(template);

  if (!publicKey || !serviceId || !templateId) {
    throw new Error("Email service is not configured.");
  }

  ensureEmailJsInit();

  await emailjs.send(
    serviceId,
    templateId,
    enrichEmailJsParams(templateParams),
    { publicKey }
  );
}

export { getEmailJsErrorMessage };
