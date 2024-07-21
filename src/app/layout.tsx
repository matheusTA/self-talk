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
      <body className="mx-auto flex h-screen w-full max-w-7xl flex-col p-2">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          <main className="h-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
