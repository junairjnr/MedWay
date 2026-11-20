"use client";

import { useState } from "react";
import { getEmailJsErrorMessage, isEmailJsConfigured, sendEmailJs } from "@/lib/emailjs";

interface RentalEnquiryFormProps {
  rentalName: string;
}

/** Doc-specified fields: name, phone, what you need, when you need it. */
export default function RentalEnquiryForm({ rentalName }: RentalEnquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatYouNeed: rentalName,
    whenNeeded: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    if (!isEmailJsConfigured("inquiry")) {
      setStatus("error");
      setMessage("Email service is not configured yet. Please call or WhatsApp us directly.");
      return;
    }

    try {
      await sendEmailJs("inquiry", {
        from_name: form.name.trim(),
        from_email: "not-provided@medwaymobility.ca",
        reply_to: "not-provided@medwaymobility.ca",
        phone: form.phone.trim() || "Not provided",
        subject: `Rental enquiry: ${rentalName}`,
        category: rentalName,
        product_name: rentalName,
        message: `What they need: ${form.whatYouNeed.trim()}\nWhen needed: ${form.whenNeeded.trim()}`,
        updates: "No",
      });

      setStatus("success");
      setMessage("Thank you. We've received your rental enquiry and will reply shortly.");
      setForm({ name: "", phone: "", whatYouNeed: rentalName, whenNeeded: "" });
    } catch (error) {
      setStatus("error");
      setMessage(getEmailJsErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rental-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          Name
        </label>
        <input
          id="rental-name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="rental-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          Phone
        </label>
        <input
          id="rental-phone"
          required
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          autoComplete="tel"
        />
      </div>
      <div>
        <label htmlFor="rental-need" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          What you need
        </label>
        <input
          id="rental-need"
          required
          value={form.whatYouNeed}
          onChange={(e) => update("whatYouNeed", e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="rental-when" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          When you need it
        </label>
        <input
          id="rental-when"
          required
          value={form.whenNeeded}
          onChange={(e) => update("whenNeeded", e.target.value)}
          placeholder="e.g. this week, March 20, ASAP"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      {message && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-primary"}`}>{message}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Request rental"}
      </button>
    </form>
  );
}
