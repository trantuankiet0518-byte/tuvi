"use client";

import { Link } from "@/i18n/navigation";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export default function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold rounded-full px-4 py-2 transition-all min-h-[40px] flex items-center ${
        isActive
          ? "bg-primary text-on-primary shadow-sm"
          : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50"
      }`}
    >
      {children}
    </Link>
  );
}
