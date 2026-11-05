import type { Metadata } from "next";
import { Syne, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const head = Syne({ subsets: ["latin"], variable: "--f-head", weight: ["600", "700", "800"] });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "StudioSpace | Rent creative studios by the hour",
  description: "Find, book and host photo studios, sound stages, podcast rooms, music suites and art workshops.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${head.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
