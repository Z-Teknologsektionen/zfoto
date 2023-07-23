import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import authOptions from "~/server/auth";
import "../styles/globals.css";
import { Footer } from "./footer";
import Header from "./header";

export const metadata: Metadata = {
  title: { absolute: "zFoto", template: "%s | zFoto" },
  icons: "/zFoto.svg",
};

const BaseLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="sv">
      <body className="overflow-x-hidden">
        <Toaster position="top-center" reverseOrder={false} />
        <>
          <div className="flex min-h-screen flex-grow flex-col">
            <Header key={JSON.stringify(session)} session={session} />
            {children}
          </div>
          <Footer key={JSON.stringify(session)} session={session} />
        </>
      </body>
    </html>
  );
};

export default BaseLayout;
