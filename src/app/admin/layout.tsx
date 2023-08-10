import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default AdminLayout;
