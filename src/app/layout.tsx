import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import Background from "@/components/background";
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
      <body className="h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Background>
            <div className="mx-auto flex size-full max-w-7xl flex-col p-2">
              <Header />
              <div className="size-full">{children}</div>
            </div>
          </Background>
        </ThemeProvider>
      </body>
    </html>
  );
}
