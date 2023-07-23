import { Metadata } from "next";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import authOptions from "~/server/auth";
import SignInButton from "./sign-in-button";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <div className="grid flex-grow place-items-center">
          <SignInButton></SignInButton>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="my-8 flex-grow space-y-8">{children}</main>
    </>
  );
};

export default AdminLayout;
