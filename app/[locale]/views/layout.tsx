import { ReactNode } from "react";
import { Navbar, Sidebar } from "@/components/organisms";

export default function ViewsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-20 pb-12 px-6 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
