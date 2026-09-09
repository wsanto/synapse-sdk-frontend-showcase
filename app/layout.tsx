import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PartnershipsBanner } from "@/components/partnerships-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaiko Synapse SDK",
  description:
    "Emotional intelligence layer for AI agents. Partnerships-only access — contact partnerships@kaikostudios.xyz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/kaiko-logo-black.svg"
        />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <PartnershipsBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
