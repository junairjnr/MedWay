"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewsletterFormProps {
  variant?: "inline" | "footer" | "hero" | "section";
}

export default function NewsletterForm({ variant = "inline" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe.");
    }
  }

  const isFooter = variant === "footer";
  const isHero = variant === "hero" || variant === "section";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className={`flex-1 min-h-11 px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
            isFooter ? "bg-slate-800 border border-slate-600 text-white placeholder:text-slate-500" :
            isHero ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50" :
            "bg-white border border-border text-foreground"
          }`}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === "loading"}
          className={`min-h-11 px-5 sm:px-6 py-3 text-sm font-semibold rounded-md transition-all disabled:opacity-60 whitespace-nowrap ${
            isFooter || isHero ? "bg-primary text-white hover:bg-primary-dark" : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </motion.button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>{message}</p>
      )}
    </div>
  );
}
