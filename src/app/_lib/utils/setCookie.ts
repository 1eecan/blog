"use server";
import { cookies } from "next/headers";

const setCookie = async (key: string, value: string) => {
  cookies().set(key, value);
};

export default setCookie;
