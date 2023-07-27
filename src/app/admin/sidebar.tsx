"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="left-0 top-0 flex flex-row  items-center justify-center gap-4 lg:sticky lg:-mt-8 lg:h-screen lg:w-[200px] lg:flex-col lg:justify-start lg:pt-10">
      <div className="flex flex-col">
        <h2 className="text-center text-xl font-medium underline underline-offset-2">
          Navigering
        </h2>
        <Button asChild variant="link" size="lg">
          <Link href="/admin/albums">Album</Link>
        </Button>
        <Button
          asChild
          variant="link"
          size="lg"
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
          onClick={() => toast.error("Kommer snart...")}
        >
          Dölj mottagningsalbum
        </Button>
        <Button
          className="mx-2"
          size="sm"
          variant="outline"
          onClick={() => toast.error("Kommer snart...")}
        >
          Visa mottagningsalbum
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
