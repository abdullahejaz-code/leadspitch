import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LeadsPitch",
    template: "%s | LeadsPitch",
  },
  description: "Curated business lead lists for niche markets.",
};

// Runs before hydration so the correct theme paints on the first frame.
// Defaults to dark, but honors an explicitly light system preference or a
// previously saved manual choice — see components/ThemeToggle.tsx.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("lp-theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
