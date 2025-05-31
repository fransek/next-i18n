import { ClientComponent } from "@/components/ClientComponent";
import { ServerComponent } from "@/components/ServerComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <nav className="flex gap-4 p-2">
          <Link href="/en-US" lang="en">
            English (US)
          </Link>
          <Link href="/en-GB" lang="en">
            English (UK)
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
          <ServerComponent />
          <ClientComponent />
        </div>
      </main>
    </>
  );
}
