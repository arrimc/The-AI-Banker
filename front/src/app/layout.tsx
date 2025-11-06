"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { bigShoulders, roboto } from "@/styles/fonts/fonts";
import "@/styles/globals.css";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable} 
          ${bigShoulders.variable} 
          antialiased
        `}
      >
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="fixed z-2 p-2 bg-gray-800 text-white rounded"
        >
          {isNavOpen ? (
            <span className="text-xl">×</span>
          ) : (
            <span className="text-xl">Chat</span>
          )}
        </button>
        <div className="flex h-screen">
          <Navbar isOpen={isNavOpen} />
          <div className={` ransition-all duration-300 ml-0 overflow-hidden`}>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
