import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_BRAND_NAME ?? "AI Ops Consultancy",
  description: "AI at Scale for SMEs and Enterprises in India & Abroad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME ?? "AI Ops Consultancy";
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-semibold text-slate-800">
              {brand}
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-600">
              <Link href="/packages" className="hover:text-slate-900">Packages</Link>
              <Link href="/templates" className="hover:text-slate-900">Templates</Link>
              <Link href="/audit" className="hover:text-slate-900">Free AI Audit</Link>
              <Link href="/contact" className="hover:text-slate-900">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
