import type { Metadata } from "next";
import "./globals.css";
import DashboardLayoutClient from "@/components/DashboardLayoutClient";

export const metadata: Metadata = {
  title: "Neovest Dashboard",
  description: "Neovest Investment Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DashboardLayoutClient>
          {children}
        </DashboardLayoutClient>
      </body>
    </html>
  );
}