import { ReactNode } from "react";
import { layoutGutterClass, layoutMaxWidthClass } from "@/lib/layout";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
  /** `content` = page sections; `chrome` = header/footer shell (same gutters, separate from main flow). */
  variant?: "content" | "chrome";
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  variant = "content",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full ${layoutMaxWidthClass} ${layoutGutterClass} ${className}`}
      data-layout={variant}
    >
      {children}
    </Tag>
  );
}
