import { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden selection:bg-primary selection:text-on-primary">
      {/* Hero video background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-50 dark:opacity-60"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

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
