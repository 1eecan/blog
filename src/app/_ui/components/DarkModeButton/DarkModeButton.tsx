"use client";

import { useState, useEffect } from "react";
import Moon from "./assets/moon.svg";
import Sun from "./assets/sun.svg";
import Image from "next/image";
import { setCookie } from "@/app/_ui/components/DarkModeButton/setCookie";

const THEME_KEY = "theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const DarkModeButton = ({
  buttonTheme,
}: {
  buttonTheme: string | undefined;
}) => {
  const [theme, setTheme] = useState<string | undefined>(() =>
    buttonTheme === undefined ? LIGHT_THEME : buttonTheme
  );

  const toggleDarkMode = () => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setCookie(THEME_KEY, newTheme);
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
};

export default DarkModeButton;
