"use client";

import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [currentProgress, setCurrentProgress] = useState("0");

  const scrollEvent = () => {
    const progressBar = document.querySelector(".bar");

    if (progressBar === null) return;

    let scrollNum = 0;
    let documentHeight = 0;

    const getPercent = (scroll: number, total: number) => {
      return (scroll / total) * 100;
    };

    scrollNum = document.documentElement.scrollTop;

    documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setCurrentProgress(() => {
      return getPercent(scrollNum, documentHeight) + "%";
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  return (
    <div className="h-[4px] fixed top-0 left-0 w-full bg-white dark:bg-black">
      <div
        style={{ width: currentProgress }}
        className="bar h-full absolute z-10 bg-[#f1d970] rounded-r-lg transition-width duration-30 dark:bg-[#a38b21]"
      ></div>
    </div>
  );
};

export default ProgressBar;
