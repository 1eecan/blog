"use client";

import { useRouter } from "next/navigation";
import DarkModeButton from "../DarkModeButton/DarkModeButton";

const Header = () => {
  const router = useRouter();
  return (
    <nav className="w-full flex justify-between">
      <div className="flex">
        <p
          className="text-lg font-semibold dark:text-white"
          onClick={() => {
            router.back();
          }}
        >
          cd ..
        </p>
      </div>
      <DarkModeButton />
    </nav>
  );
};

export default Header;
