"use client";

import { useRouter } from "next/navigation";
import DarkModeButton from "../DarkModeButton/DarkModeButton";

const Header = ({ initialTheme }: { initialTheme: string | undefined }) => {
  const router = useRouter();
  return (
    <nav className="w-full flex justify-between">
      <div className="flex">
        <p
          className="text-lg font-semibold dark:text-white hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          cd ..
        </p>
      </div>
      <DarkModeButton initialTheme={initialTheme} />
    </nav>
  );
};

export default Header;
