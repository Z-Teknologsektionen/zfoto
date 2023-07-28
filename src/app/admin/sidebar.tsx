"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="left-0 top-0 flex flex-row items-start justify-center gap-8 lg:sticky lg:-mt-8 lg:h-screen lg:w-[200px] lg:flex-col lg:items-center lg:justify-start lg:gap-4 lg:pt-10">
      <div className="flex flex-col">
        <h2 className="mb-2 text-center text-xl font-medium underline underline-offset-2">
          Navigering
        </h2>
        <Button asChild variant="link">
          <Link href="/admin/albums">Album</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/admin/users">Användare</Link>
        </Button>
        <Button
          asChild
          variant="link"
          onClick={() => toast.error("Kommer snart...")}
        >
          <Link href="/admin">Bilder</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-center text-xl font-medium underline underline-offset-2">
          Funktioner
        </h2>
        <Button
          className="mx-2"
          size="sm"
          variant="outline"
          onClick={async () => {
            const res = await fetch(`/api/images/reception`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ visible: false }),
            });
            if (!res.ok) {
              return toast.error("Okänt fel, försök igen senare...");
            }
            toast.success("Mottaningsalbum dolda!");
          }}
        >
          Dölj mottagningsalbum
        </Button>
        <Button
          className="mx-2"
          size="sm"
          variant="outline"
          onClick={async () => {
            const res = await fetch(`/api/images/reception`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ visible: true }),
            });
            if (!res.ok) {
              return toast.error("Okänt fel, försök igen senare...");
            }
            toast.success("Mottaningsalbum visas!");
          }}
        >
          Visa mottagningsalbum
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
