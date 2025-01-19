import { ClientLocale } from "@/components/ClientLocale";
import { ServerLocale } from "@/components/ServerLocale";

export default async function Home() {
  return (
    <>
      <ServerLocale />
      <ClientLocale />
    </>
  );
}
