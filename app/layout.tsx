import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import AuroraBg from "@/components/layout/aurora-bg";
import Cursor from "@/components/layout/cursor";
import Navbar from "@/components/layout/navbar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fuzail - Full Stack Developer",
  description: "Personal website and portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${mono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <AuroraBg />
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
