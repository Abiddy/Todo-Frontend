import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-zinc-900 min-h-screen`}>
        {/* Persistent Header */}
        <header className="w-full bg-zinc-950 py-8">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="flex items-center justify-center gap-2">
              <Image 
                src="/rocket.png" 
                alt="Rocket icon" 
                width={20} 
                height={20} 
                className="mt-1"
              />
              <span className="text-3xl font-extrabold">
                <span className="text-[#4AA7E3]">Todo </span>
                <span className="text-[#8B5CF6]">App</span>
              </span>
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
