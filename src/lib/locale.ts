import { cookies } from "next/headers";

export const locale = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("locale")?.value;
};
