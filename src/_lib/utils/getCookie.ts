"use server";
import { cookies } from "next/headers";

export default function getCookie() {
  return cookies().get("theme")?.value === "dark" ? "dark" : undefined;
}
