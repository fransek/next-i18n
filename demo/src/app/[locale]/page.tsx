import { ClientComponent } from "@/components/ClientComponent";
import { ServerComponent } from "@/components/ServerComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <nav className="flex gap-4 p-2">
          <Link href="/en" lang="en">
            English
          </Link>
          <Link href="/it" lang="it">
            Italiano
          </Link>
          <Link href="/sv" lang="sv">
            Svenska
          </Link>
        </nav>
      </header>
      <main className="p-2">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">Server</h2>
          <ServerComponent />
          <h2 className="font-bold">Client</h2>
          <ClientComponent />
        </div>
      </main>
    </>
  );
}
