"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { trpc } from "~/trpc/client";

const AdminSidebar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { mutate: setReceptionVisibility, isLoading } =
    trpc.album.setReceptionVisibility.useMutation({
      onMutate: ({ visible }) =>
        toast.loading(
          `${visible ? "Visar" : "Döljer"} alla mottagningsalbum...`,
        ),
      onSettled: (_, __, ___, context) => toast.dismiss(context),
      onSuccess: (_, { visible }) =>
        toast.success(
          `${visible ? "Visar" : "Döljer"} nu alla mottagningsalbum!`,
        ),
      onError: (error, { visible }) => {
        toast.error(
          `Kunde inte ${visible ? "visa" : "dölja"} alla mottagningsalbum!`,
        );
        toast.error(error.message);
      },
    });

  return (
    <aside className="left-0 top-0 mx-4 flex flex-row items-start justify-center gap-8 lg:sticky lg:-mt-8 lg:h-screen lg:w-[250px] lg:flex-col lg:items-center lg:justify-start lg:gap-4 lg:pt-10">
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
        <Button asChild variant="link">
          <Link href="/admin/users">Användare</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/admin/info">Information</Link>
        </Button>
      </div>
      {isAdmin && (
        <>
          <Separator className="hidden lg:block" />
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-medium underline underline-offset-2">
              Funktioner
            </h2>
            <Button
              className="mx-2"
              size="sm"
              variant="outline"
              disabled={isLoading}
              onClick={() => setReceptionVisibility({ visible: false })}
            >
              Dölj mottagningsalbum
            </Button>
            <Button
              className="mx-2"
              size="sm"
              variant="outline"
              disabled={isLoading}
              onClick={() => setReceptionVisibility({ visible: true })}
            >
              Visa mottagningsalbum
            </Button>
            {/* TODO: Lägg till möjligheten att återställa lösenordet för patetinlogg */}
          </div>
        </>
      )}
    </aside>
  );
};

export default AdminSidebar;
