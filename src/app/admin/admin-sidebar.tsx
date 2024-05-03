"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { setReceptionVisibilityAction } from "./actions/setReceptionVisibilityAction";

const AdminSidebar = ({ isAdmin }: { isAdmin: boolean }) => {
  const setReceptionVisibilityClientAction = async (visible: boolean) => {
    const loadingId = toast.loading(
      `${visible ? "Visar" : "Döljer"} alla mottagningsalbum...`,
    );
    const result = await setReceptionVisibilityAction({
      isVisible: visible,
    });

    toast.dismiss(loadingId);

    if (result.error) {
      return toast.error(result.error);
    }

    return toast.success(
      `${visible ? "Visar" : "Döljer"} nu alla mottagningsalbum!`,
    );
  };

  const [isUpdating, startTransition] = useTransition();

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
        {isAdmin && (
          <Button asChild variant="link">
            <Link href="/admin/users">Användare</Link>
          </Button>
        )}
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
            <form
              action={() =>
                startTransition(() => {
                  setReceptionVisibilityClientAction(false);
                })
              }
            >
              <Button
                className="mx-2"
                size="sm"
                variant="outline"
                disabled={isUpdating}
              >
                Dölj mottagningsalbum
              </Button>
            </form>
            <form
              action={() =>
                startTransition(() => {
                  setReceptionVisibilityClientAction(true);
                })
              }
            >
              <Button
                className="mx-2"
                size="sm"
                variant="outline"
                disabled={isUpdating}
              >
                Visa mottagningsalbum
              </Button>
            </form>
            {/* TODO: Lägg till möjligheten att återställa lösenordet för patetinlogg */}
          </div>
        </>
      )}
    </aside>
  );
};

export default AdminSidebar;
