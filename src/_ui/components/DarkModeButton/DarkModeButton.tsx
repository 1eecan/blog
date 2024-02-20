"use client";

import { useState, useEffect } from "react";
import Moon from "./assets/moon.svg";
import Sun from "./assets/sun.svg";
import Image from "next/image";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

export default function DarkModeButton({
  initialTheme,
}: {
  initialTheme: string | undefined;
}) {
  const [theme, setTheme] = useState<string | undefined>(() =>
    initialTheme === undefined ? LIGHT_THEME : DARK_THEME
  );

  const toggleDarkMode = () => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button onClick={toggleDarkMode}>
      {theme === DARK_THEME ? (
        <Image src={Moon} alt="Moon" />
      ) : (
        <Image src={Sun} alt="Sun" />
      )}
    </button>
  );
}
