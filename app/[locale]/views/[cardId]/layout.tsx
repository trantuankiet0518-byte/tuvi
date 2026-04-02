import { ReactNode } from "react";

export default function CardLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl mx-auto">{children}</div>;
}
