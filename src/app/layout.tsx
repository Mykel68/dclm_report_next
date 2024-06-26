/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DCLM Report ",

  description: "Launch your Complaint...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen w-full bg-slate-50 text-black  ",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster richColors position="top-right" expand={true} />
      </body>
    </html>
  );
}
