"use client";

import { useTranslations } from "next-intl";
import Icon from "@/components/atoms/Icon";
import { Link, usePathname } from "@/i18n/navigation";

const sidebarItems = [
  { href: "/views",         icon: "dashboard",      labelKey: "nav.lapLaSo"  },
  { href: "/vanhan",        icon: "calendar_today", labelKey: "nav.vanHan"   },
  { href: "/thuvien",       icon: "auto_stories",   labelKey: "nav.thuVien"  },
  { href: "/hoso",          icon: "person",         labelKey: "nav.hoSo"     },
] as const;

export default function Sidebar() {
  const t        = useTranslations();
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-transparent min-h-screen pt-24 pb-6 flex-shrink-0 backdrop-blur-xl">
      <nav className="px-4 space-y-2">
        {sidebarItems.map(({ href, icon, labelKey }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[48px]
                ${isActive
                  ? "bg-primary text-on-primary shadow-md shadow-primary/10"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                }
              `}
              >
              <Icon name={icon} className="text-[1.4rem]" />
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
