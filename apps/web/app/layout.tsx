import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Background } from "../components/Background";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "About Inzm",
  description: "Just an personal profile.",
  openGraph: {
    title: "About Inzm",
    description: "Just an personal profile.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Inzm",
    description: "Just an personal profile.",
  }
};

import { VisitorTracker } from "../components/VisitorTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="h-screen w-screen overflow-hidden flex flex-col">
        <Background />
        <VisitorTracker />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 xl:p-10 scroll-smooth relative z-10 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
