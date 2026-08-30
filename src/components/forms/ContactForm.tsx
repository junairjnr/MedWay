"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
  productName?: string;
  showUpdates?: boolean;
}

export default function ContactForm({ productName, showUpdates = false }: ContactFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: productName ? `Enquiry: ${productName}` : "",
    category: productName || "",
    message: "",
    updates: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const name = `${form.firstName} ${form.lastName}`.trim();
    try {
      const endpoint = productName ? "/api/inquiry" : "/api/contact";
      const body = productName
        ? { name, email: form.email, phone: form.phone, productName, message: form.message }
        : { name, email: form.email, phone: form.phone, subject: form.subject || form.category, message: form.message };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you. We've received your enquiry. Our team will get back to you shortly.");
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", category: "", message: "", updates: false });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to send. Please try again.");
    }
  }

  const inputClass = "w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center">
        <h3 className="font-display text-2xl font-bold mb-3">Thank you.</h3>
        <p className="text-muted">{message}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">First Name *</label>
          <input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Last Name *</label>
          <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Email *</label>
          <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
        </div>
      </div>
      {!productName && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Subject</label>
            <input value={form.subject} onChange={(e) => update("subject", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Product / Category</label>
            <input value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass} />
          </div>
        </div>
      )}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Message *</label>
        <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${inputClass} resize-none`} />
      </div>
      {showUpdates && (
        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
          <input type="checkbox" checked={form.updates} onChange={(e) => update("updates", e.target.checked)} className="accent-primary" />
          I would like to receive product updates and information.
        </label>
      )}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto bg-primary text-white px-10 py-3.5 text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : productName ? "Send Enquiry" : "Send Message"}
      </motion.button>
      {status === "error" && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}
