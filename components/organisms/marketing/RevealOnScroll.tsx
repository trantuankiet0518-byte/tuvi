import { type ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "from-left" | "from-right" | "scale-in";
};

export default function RevealOnScroll({
  children,
  className = "",
}: RevealOnScrollProps) {
  return <div className={className}>{children}</div>;
}
