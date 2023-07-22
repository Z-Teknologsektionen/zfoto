import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

const AdminLayout = async ({ children }:{ children: ReactNode }) => {
  const session = await getServerSession();

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
