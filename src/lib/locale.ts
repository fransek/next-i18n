import { cookies } from "next/headers";

export const locale = async <T extends string | undefined>() => {
  const cookieStore = await cookies();
  return cookieStore.get("locale")?.value as T;
};
