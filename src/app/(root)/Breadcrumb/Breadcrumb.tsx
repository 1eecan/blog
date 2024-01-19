"use client";

import { usePathname } from "next/navigation";
export default function Breadcrumb() {
  const pathname = usePathname();
  return (
    <nav className="w-full flex justify-between">
      <div className="flex">
        <h1 className="text-2xl font-bold">
          {pathname === "/" ? "/1eecan" : "/1eecan" + pathname}
        </h1>
      </div>
    </nav>
  );
}
