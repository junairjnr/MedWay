import nodemailer from "nodemailer";
import { siteContact } from "@/data/site-contact";

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail(options: MailOptions): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const adminEmail = process.env.ADMIN_EMAIL || siteContact.email;

  if (!host || !user || !pass) {
    console.log("[Med Way Mail - Demo Mode]");
    console.log("To:", options.to || adminEmail);
    console.log("Subject:", options.subject);
    console.log("Body:", options.html);
    return true;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Med Way" <${from}>`,
    to: options.to || adminEmail,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });

  return true;
}

export function buildContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  return `
    <h2>New Contact Inquiry — Med Way</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export function buildNewsletterEmail(email: string): string {
  return `
    <h2>New Newsletter Subscription — Med Way</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p>Subscribed at: ${new Date().toISOString()}</p>
  `;
}

export function buildProductInquiryEmail(data: {
  name: string;
  email: string;
  phone?: string;
  productName: string;
  message: string;
}): string {
  return `
    <h2>Product Inquiry — Med Way</h2>
    <p><strong>Product:</strong> ${data.productName}</p>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export function buildWelcomeEmail(): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Welcome to Med Way!</h1>
      <p>Thank you for subscribing to our newsletter. You'll receive the latest offers, product updates, and health care tips directly in your inbox.</p>
      <p>Get offers and promotions in your mailbox — shop with total confidence at Med Way.</p>
      <p style="color: #64748b; font-size: 14px;">Med Way — Canada's Trusted Home Health Care & Mobility Experts</p>
    </div>
  `;
}
