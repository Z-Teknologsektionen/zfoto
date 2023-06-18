import type { NextConfig } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

const AdminHomePage: NextConfig = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const { mutate: hideReceptionAlbums } =
    trpc.album.hideReceptionAlbums.useMutation({
      onMutate: () => toast.loading("Döljer alla mottagningsalbum..."),
      onSettled: (_d, _e, _v, toastId) => toast.remove(toastId),
      onError: () => toast.error("Okänt fel, försök igen senare!"),
      onSuccess: () => toast.success("Alla mottagningsalbum nu dolda"),
    });
  const { mutate: showReceptionAlbums } =
    trpc.album.showReceptionAlbums.useMutation({
      onMutate: () => toast.loading("Visar alla mottagningsalbum..."),
      onSettled: (_d, _e, _v, toastId) => toast.remove(toastId),
      onError: () => toast.error("Okänt fel, försök igen senare!"),
      onSuccess: () => toast.success("Visar nu alla mottagningsalbum"),
    });

  return (
    <MainLayout>
      <SectionWrapper className="mx-auto my-4 max-w-7xl px-4">
        {status === "authenticated" && session && (
          <div className="flex flex-col gap-2">
            <div>
              <h1>Hej {session.user?.name}</h1>
            </div>
            <div>
              <Link
                className="block w-fit border-2 px-2 py-1 transition duration-500 hover:scale-105 active:scale-95"
                href="/admin/album"
              >
                Redigera album
              </Link>
            </div>
            <button
              className="block w-fit border-2 px-2 py-1 transition duration-500 hover:scale-105 active:scale-95"
              onClick={() => {
                hideReceptionAlbums();
              }}
              type="button"
            >
              Dölj alla mottagningsalbum
            </button>
            <button
              className="block w-fit border-2 px-2 py-1 transition duration-500 hover:scale-105 active:scale-95"
              onClick={() => {
                showReceptionAlbums();
              }}
              type="button"
            >
              Visa alla mottagningsalbum
            </button>
            <button
              className="w-fit underline-offset-2 hover:underline"
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}`,
                })
              }
              type="button"
            >
              Logga ut
            </button>
          </div>
        )}
      </SectionWrapper>
    </MainLayout>
  );
};

export default AdminHomePage;
