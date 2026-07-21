import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SecurityGate from "@/components/SecurityGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Sylvor Labs — Secure Digital Products That Scale",
  description:
    "Studio rekayasa digital yang merancang, membangun, dan mengamankan produk teknologi premium: website, penetration testing, dan keamanan aplikasi.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${inter.variable}`}>
        <ThemeProvider>
          <SecurityGate>
            {children}
          </SecurityGate>
        </ThemeProvider>
      </body>
    </html>
  );
}