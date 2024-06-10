/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex  ",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        {/* sidebar */}
        {/* <p className="border">Sidebar</p> */}
        <SideNavbar  />
        {/* main page */}
        <div className="p-8 w-full ">
               <Header />
          {
     
          children}</div>
      </body>
    </html>
  );
}
