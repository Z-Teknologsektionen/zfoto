"use client";

import type { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);
