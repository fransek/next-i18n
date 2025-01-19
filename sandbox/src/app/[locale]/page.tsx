import { Locale } from "@/components/Locale";
import { locale } from "@fransek/next-i18n";

export default async function Home() {
  return (
    <div>
      Server: {await locale()}
      <Locale />
    </div>
  );
}
