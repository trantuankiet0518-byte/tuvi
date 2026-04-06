import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type AuthTemplateProps = {
  children: ReactNode;
  compact?: boolean;
};

export default function AuthTemplate({ children, compact = false }: AuthTemplateProps) {
  const t = useTranslations("authTemplate");
  const shared = useTranslations("shared");

  if (compact) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-mystic-gradient text-on-background selection:bg-primary selection:text-on-primary">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8%] top-[-10%] h-[26rem] w-[26rem] rounded-full bg-primary/12 blur-3xl animate-float-drift" />
          <div className="absolute right-[-10%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-tertiary/10 blur-3xl animate-float-drift [animation-delay:1.4s]" />
          <div className="absolute bottom-[-18%] left-[18%] h-[28rem] w-[28rem] rounded-full bg-primary-fixed/10 blur-3xl animate-soft-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_34%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(196,122,0,0.12)_1px,transparent_0)] [background-size:24px_24px] opacity-35" />
        </div>

        <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="bg-mystic-gradient text-on-background min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-tertiary/10 blur-[120px]" />
      </div>
      <nav className="relative z-10 flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          {t("brand")}
        </Link>
      </nav>
      <main className="flex-grow flex items-center justify-center px-6 relative z-10 py-12">
        {children}
      </main>
      <footer className="relative z-10 w-full py-8 bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center px-8 gap-4">
        <p className="text-[0.6875rem] tracking-[0.05em] uppercase text-on-surface/50">
          {t("footer")}
        </p>
        <div className="flex gap-8">
          {[shared("footer.privacy"), shared("footer.terms"), shared("footer.support")].map((label) => (
            <Link
              key={label}
              href="#"
              className="text-[0.6875rem] tracking-[0.05em] uppercase text-on-surface/50 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
