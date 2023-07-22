import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: { absolute: "zFoto", template: "%s | zFoto" },
  icons: "/zFoto.svg",
};

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="sv">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
};

export default BaseLayout;
