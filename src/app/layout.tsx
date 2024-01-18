import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body className={`${inter.className} antialiased`}>
        {" "}
        <Link href={"/about"}>go to about</Link>
        <br></br>
        <Link href={"/"}>go to post-list</Link>
        {children}
      </body>
    </html>
  );
}
