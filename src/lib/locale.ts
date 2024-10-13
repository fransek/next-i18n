import { cookies } from "next/headers";

export const locale = () => cookies().get("locale")?.value;
