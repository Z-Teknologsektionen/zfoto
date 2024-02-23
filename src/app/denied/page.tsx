import { Metadata } from "next";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Obehörig",
};

const UnauthorizedPage = () => {
  return (
    <div className="grid flex-grow place-items-center">
      <section className="flex flex-col items-center gap-12">
        <h1 className="text-5xl">Obehörig</h1>
        <p className="text-bala max-w-2xl text-center text-xl">
          Du är inloggad, men du har inte den berhörigheten som krävs för att se
          denna sida.
        </p>
        <Button asChild variant="link">
          <Link href="/" className="text-3xl underline">
            Åter till startsidan
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default UnauthorizedPage;
