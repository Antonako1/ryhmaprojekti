import { useAuth } from "@/Utils/context/contextUser";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/Utils/context/contextUser";
import VerifyUser from "@/components/Verify/VerifyUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alc & Autos",
  description: "For the true gangsters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <VerifyUser />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
