import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IPSUM Pathology | Laboratory & Diagnostic Center",
  description:
    "IPSUM Pathology laboratory and diagnostic center for reliable analysis, pathology, and molecular diagnostics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
