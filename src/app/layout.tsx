import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Provider } from "../providers/graphqlProvider";

import "./globals.css";
import Navbar from "./components/navbar/navbar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-lightPink dark:bg-black">
          <Navbar />
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
