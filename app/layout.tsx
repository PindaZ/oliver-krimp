import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natuurbeheer Krimpenerwaard | OLIVER",
  description: "Professioneel natuurbeheer platform voor de Krimpenerwaard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} antialiased`}>
        <div className="max-w-7xl mx-auto min-h-screen">
          <Navigation />
          <main className="px-4 pb-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
