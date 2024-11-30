import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import "./globals.css";
import React from "react";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Container } from "@mui/material";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Smart Resume",
  description: "Analyze your resume using AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider session={session}>
          <Providers>
            <Navbar />
            <Toaster />
            <Container maxWidth="xl">{children}</Container>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
