import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Header from "../_ui/components/Header/Header";
import Breadcrumb from "../_ui/components/Breadcrumb/Breadcrumb";
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
  const initialTheme = "DARK_THEME";
  return (
    <html lang="ko" className={initialTheme}>
      <body
        className={`${inter.className} antialiased dark:bg-[#1a1a1a] dark:text-[#dddddd]`}
      >
        <Header initialTheme={initialTheme} />
        <Breadcrumb />
        <div className="max-w-[800px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
