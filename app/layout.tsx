import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tử Vi Alchemist",
  description: "Precision Mysticism for the Modern Age",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
