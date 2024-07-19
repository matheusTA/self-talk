import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Self-Talk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-black">{children}</body>
    </html>
  );
}
