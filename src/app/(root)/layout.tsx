import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cookies } from "next/headers";

import Header from "../_ui/components/Header/Header";
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
  function darkMode() {
    const cookieStore = cookies();
    return cookieStore.get("theme")?.value === "dark" ? "dark" : undefined;
  }
  return (
    <html lang="ko" className={darkMode()}>
      <body
        className={`${inter.className} antialiased dark:bg-[#1a1a1a] dark:text-[#dddddd]`}
      >
        <Header theme={darkMode()} />
        <div className="max-w-[800px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
