import nodemailer from "nodemailer";
import { siteContact } from "@/data/site-contact";

export interface MailOptions {
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export class MailConfigurationError extends Error {
  constructor(message = "Email service is not configured.") {
    super(message);
    this.name = "MailConfigurationError";
  }
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || siteContact.email;
}

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendViaResend(options: MailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new MailConfigurationError();

  const from = process.env.EMAIL_FROM || "Medway Website <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [options.to || getAdminEmail()],
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to send email via Resend.");
  }
}

async function sendViaSmtp(options: MailOptions): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass) {
    throw new MailConfigurationError();
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Medway Healthcare" <${from}>`,
    to: options.to || getAdminEmail(),
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });
}

export async function sendMail(options: MailOptions): Promise<boolean> {
  const payload: MailOptions = {
    ...options,
    to: options.to || getAdminEmail(),
  };

  if (process.env.RESEND_API_KEY) {
    await sendViaResend(payload);
    return true;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    await sendViaSmtp(payload);
    return true;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn("[Medway Mail - Dev Mode] No RESEND_API_KEY or SMTP credentials configured.");
    console.log("To:", payload.to);
    console.log("Subject:", payload.subject);
    console.log("Reply-To:", payload.replyTo || "(none)");
    console.log("Body:", payload.html);
    return true;
  }

  throw new MailConfigurationError(
    "Email is not configured. Add RESEND_API_KEY or SMTP settings in Vercel environment variables."
  );
}

export function buildContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : "";
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1a2332;">
      <h2 style="color: #0f766e; margin-bottom: 16px;">New Contact Message — Medway</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="line-height: 1.6;">${message}</p>
    </div>
  `;
}

export function buildNewsletterEmail(email: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1a2332;">
      <h2 style="color: #0f766e;">New Newsletter Subscription — Medway</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p>Subscribed at: ${new Date().toISOString()}</p>
    </div>
  `;
}

export function buildProductInquiryEmail(data: {
  name: string;
  email: string;
  phone?: string;
  productName: string;
  message: string;
}): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : "";
  const productName = escapeHtml(data.productName);
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1a2332;">
      <h2 style="color: #0f766e; margin-bottom: 16px;">New Product Enquiry — Medway</h2>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="line-height: 1.6;">${message}</p>
    </div>
  `;
}

export function buildWelcomeEmail(): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1a2332;">
      <h1 style="color: #0f766e;">Welcome to Medway!</h1>
      <p>Thank you for subscribing to our newsletter. You'll receive product updates and mobility tips in your inbox.</p>
      <p style="color: #64748b; font-size: 14px;">Medway — Canada's Trusted Home Health Care &amp; Mobility Experts</p>
    </div>
  `;
}
