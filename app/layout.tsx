import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css";
import Footer from "./ui/Footer";
import NavBar from "./ui/NavBar";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Lumina",
  description: "Adaptive Learning WebApp",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth:React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <NavBar />
        
        <main className="relative">
          {children}
          
        </main>
        {auth}
        <Footer />
      </body>
    </html>
  );
}