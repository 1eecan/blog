"use server";
import { cookies } from "next/headers";

const getCookie = () => {
  return cookies().get("theme")?.value === "dark" ? "dark" : undefined;
};

export default getCookie;
