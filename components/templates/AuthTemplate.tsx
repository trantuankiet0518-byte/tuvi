import { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export default function AuthTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="bg-mystic-gradient text-on-background min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-tertiary/10 blur-[120px]" />
      </div>
      <nav className="relative z-10 flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          Tử Vi Alchemist
        </Link>
      </nav>
      <main className="flex-grow flex items-center justify-center px-6 relative z-10 py-12">
        {children}
      </main>
      <footer className="relative z-10 w-full py-8 bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center px-8 gap-4">
        <p className="text-[0.6875rem] tracking-[0.05em] uppercase text-on-surface/50">
          © 2024 Celestial Meridian. Precision Mysticism.
        </p>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map((label) => (
            <Link key={label} href="#" className="text-[0.6875rem] tracking-[0.05em] uppercase text-on-surface/50 hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
