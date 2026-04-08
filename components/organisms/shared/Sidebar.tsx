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
    <aside className="min-h-screen w-64 flex-shrink-0 px-3 pb-6 pt-24">
      <div className="ui-shell sticky top-24 rounded-[2rem] px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map(({ href, icon, labelKey }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`
                  min-h-[48px] rounded-[1.2rem] px-4 py-3 text-sm font-semibold transition-all duration-200
                  flex items-center gap-3
                  ${isActive
                    ? "bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-fixed-dim)_100%)] text-on-primary shadow-[0_14px_30px_rgba(196,122,0,0.22)]"
                    : "ui-panel-soft text-on-surface-variant hover:-translate-y-0.5 hover:text-on-surface"
                  }
                `}
                >
                <Icon name={icon} className="text-[1.4rem]" />
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
