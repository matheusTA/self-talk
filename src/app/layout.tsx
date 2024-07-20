import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Self Talk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-auto h-screen w-full max-w-7xl p-2">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
