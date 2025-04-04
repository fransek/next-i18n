import { cookies } from "next/headers";

export const getLocale = async <T extends string>() => {
  const cookieStore = await cookies();
  return cookieStore.get("locale")?.value as T;
};
