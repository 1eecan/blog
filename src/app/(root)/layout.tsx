import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Header from "../ui/components/Header/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "If you know you know",
  description: "1eecan's blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} antialiased dark:bg-[#1a1a1a] dark:text-[#dddddd]`}
      >
        <Header />
        <div className="max-w-[800px] mx-auto">{children}</div>
      </body>
    </html>
  );
}