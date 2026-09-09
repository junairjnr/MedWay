export const siteContact = {
  phone: "+1 (416) 830-4995",
  phoneTel: "+14168304995",
  phoneWhatsApp: "14168304995",
  email: "medwaymobilty@outlook.com",
  emailClass: "text-xs sm:text-sm break-all lowercase",
} as const;

export const whatsAppDefaultMessage =
  "Hello Medway Team! \u{1F44B} I'd like to know more about your products and services. Could you please assist me?";

export function mailtoHref() {
  return `mailto:${siteContact.email}`;
}

export function whatsAppHref(message = whatsAppDefaultMessage) {
  const base = `https://wa.me/${siteContact.phoneWhatsApp}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
