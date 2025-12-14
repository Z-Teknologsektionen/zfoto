import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <Fragment>{children}</Fragment>
);

export default AdminLayout;
