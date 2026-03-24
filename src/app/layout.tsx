import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Neovest Dashboard",
  description: "Neovest Investment Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-surface">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
