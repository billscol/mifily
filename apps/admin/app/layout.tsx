import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mifily Admin",
  description: "Internal admin panel for Mifily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
