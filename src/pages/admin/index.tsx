import type { NextConfig } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";

const AdminHomePage: NextConfig = () => {
  const { data: session, status } = useSession({
    required: true,
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
                className="underline-offset-2 hover:underline"
                href="/admin/album"
              >
                Redigera album
              </Link>
            </div>
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
