import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import authOptions from "~/server/auth";

const AdminLayout = async ({ children }:{ children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    return <h1>Glöm och dröm</h1>; // TODO: add a custom unauthenticated screen
  }

  return (
    <>
      <main className="mb-8 mt-32 space-y-8">{children}</main>
    </>
  );
};

export default AdminLayout;
