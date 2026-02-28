import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google' // Next.js built-in font loader
import "./globals.css";
import Footer from "./ui/Footer";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Lumina",
  description: "Adaptive Learning WebApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={jakarta.className}>
          {children}
          <Footer />
        </body>
    </html>
  );
}
