import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { Manrope } from "next/font/google";

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
    <html lang="en">
      <body
        className={`${manrope.className} bg-[#171717]`}
      > 
      <ToastProvider/>
        <ModalProvider/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
