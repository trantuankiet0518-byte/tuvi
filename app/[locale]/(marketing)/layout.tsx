import { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden selection:bg-primary selection:text-on-primary">
      {/* Hero video background — disabled */}

      <Navbar />

      {children}

      <footer className="relative z-10 bg-surface-container-low w-full py-12 px-8 elev-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-on-surface">Tử Vi Academy</div>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "FAQ"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant">
            © 2024 Tử Vi Academy. Precision Mysticism for the Modern Age.
          </p>
        </div>
      </footer>
    </div>
  );
}
