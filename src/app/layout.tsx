import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Background from "@/components/background";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import AiProviderHydration from "@/store/hydration/ai-provider";
import ChatHydration from "@/store/hydration/chat";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={cn("h-screen", inter.className)}>
        <AiProviderHydration />
        <ChatHydration />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Background>
            <div className="relative mx-auto flex size-full max-w-7xl flex-col p-2">
              <Header />
              <div className="size-full overflow-hidden">{children}</div>
            </div>
          </Background>
        </ThemeProvider>
      </body>
    </html>
  );
}
