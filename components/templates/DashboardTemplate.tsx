import { ReactNode } from "react";
import { Navbar, Sidebar } from "@/components/organisms";

interface DashboardTemplateProps {
  children: ReactNode;
}

export default function DashboardTemplate({ children }: DashboardTemplateProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-20 pb-12 px-6 max-w-full overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
