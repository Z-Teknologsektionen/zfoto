import { clearFullCacheAction } from "@/server/actions/clearFullCacheAction";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { AdminSidebarReceptionVisibilityButtons } from "./admin-sidebar-reception-visibility-buttons";

type AdminSidebarProps = { isAdmin: boolean };

export const AdminSidebar: FC<AdminSidebarProps> = ({ isAdmin }) => (
  <aside className="left-0 top-0 mx-4 flex flex-row items-start justify-center gap-8 lg:sticky lg:-mt-8 lg:h-fit lg:w-[250px] lg:flex-col lg:items-center lg:justify-start lg:gap-4 lg:pt-10">
    <div className="flex flex-col">
      <h2 className="mb-2 text-center text-xl font-medium underline underline-offset-2">
        Navigering
      </h2>
      <Button asChild variant="link">
        <Link href="/admin/albums">Album</Link>
      </Button>
      <Button asChild variant="link">
        <Link href="/admin/images">Bilder</Link>
      </Button>
      {isAdmin && (
        <Button asChild variant="link">
          <Link href="/admin/users">Användare</Link>
        </Button>
      )}
      <Button asChild variant="link">
        <Link href="/admin/info">Information</Link>
      </Button>
    </div>
    <Separator className="hidden lg:block" />
    <div className="flex flex-col gap-2">
      <h2 className="text-center text-xl font-medium underline underline-offset-2">
        Funktioner
      </h2>
      <form action={clearFullCacheAction}>
        <Button className="mx-2" size="sm" variant="outline" type="submit">
          Rensa hela sidans cache
        </Button>
      </form>
      {isAdmin && <AdminSidebarReceptionVisibilityButtons />}
      {/* TODO: Lägg till möjligheten att återställa lösenordet för patetinlogg */}
    </div>
  </aside>
);
