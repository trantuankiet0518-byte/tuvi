"use client";

import { Link } from "@/i18n/navigation";
import Icon from "./Icon";

interface SidebarNavItemProps {
  href: string;
  icon: string;
  isActive: boolean;
  children: React.ReactNode;
}

export default function SidebarNavItem({ href, icon, isActive, children }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[48px]
        ${isActive
          ? "border border-primary/20 bg-transparent text-primary shadow-md shadow-primary/10 backdrop-blur-xl"
          : "border border-transparent text-on-surface-variant hover:border-white/10 hover:bg-white/5 hover:text-on-surface backdrop-blur-xl"
        }
      `}
    >
      <Icon className="text-[1.4rem]" name={icon} />
      {children}
    </Link>
  );
}
