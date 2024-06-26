import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/_ui/components/Header/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "how,why & pizza",
  description: "1eecan's web tech blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.className} antialiased dark:bg-[#1a1a1a] dark:text-[#dddddd] max-w-[1000px] min-w-[400px] mx-auto`}
      >
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
