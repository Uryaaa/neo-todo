import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AccentColorProvider } from "@/components/accent-color-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODO App - Manage Your Tasks Efficiently",
  description: "A powerful TODO application with advanced features to help you stay organized and productive.",
  keywords: ["todo", "task management", "productivity", "organization"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-yellow-50`}
      >
        <AccentColorProvider>
          {children}
        </AccentColorProvider>
      </body>
    </html>
  );
}
