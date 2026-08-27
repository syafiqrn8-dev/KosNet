import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KosNet — Temukan Kos Impianmu",
  description:
    "Temukan kos dalam hitungan menit, bukan hari. Platform pencarian kos terpercaya di Indonesia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="bg-bg text-foreground flex min-h-full flex-col">{children}</body>
    </html>
  );
}
