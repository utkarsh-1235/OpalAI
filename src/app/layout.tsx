import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import { ToastProvider } from "@/providers/toast-provider";
import { Manrope } from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";

const manrope = Manrope({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "OpalAI",
  description: "Share AI powered videos with your friends.",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className} bg-[#171717]`}
      > 
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <ToastProvider/>
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
