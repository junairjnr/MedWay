import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  showArrow?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm hover:shadow-md border border-transparent",
  secondary:
    "bg-navy text-white hover:bg-navy-light active:bg-navy-light border border-transparent",
  white:
    "bg-white text-navy hover:bg-primary-light hover:text-white active:bg-primary-dark border border-transparent",
  outline:
    "bg-transparent text-foreground border-2 border-border hover:border-primary hover:text-primary active:bg-primary/5",
  ghost:
    "bg-transparent text-foreground hover:text-primary hover:bg-primary/5 border border-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-xs sm:text-sm gap-1.5",
  md: "min-h-11 px-5 sm:px-6 py-2.5 text-sm gap-2",
  lg: "min-h-12 sm:min-h-[3.25rem] px-6 sm:px-8 py-3 text-sm sm:text-base gap-2",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
  showArrow = true,
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center font-semibold tracking-wide",
    "rounded-md transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "touch-manipulation select-none",
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrow = showArrow && (variant === "primary" || variant === "secondary" || variant === "white") && (
    <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={`group ${base}`}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${base}`}>
      {children}
      {arrow}
    </button>
  );
}
