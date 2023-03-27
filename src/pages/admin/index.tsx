import type { NextConfig } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AdminHomePage: NextConfig = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  return (
    <div className="mx-auto my-4 max-w-7xl px-4">
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
            onClick={() => signOut()}
            type="button"
          >
            Logga ut
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
