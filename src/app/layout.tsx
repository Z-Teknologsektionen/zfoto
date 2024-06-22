import { env } from "@/env.mjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Fragment, type FC, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Footer } from "~/components/footer/footer";
import { Header } from "~/components/header/header";
import "../styles/globals.css";
import { Providers } from "./_components/layout/providers";

export const metadata: Metadata = {
  title: { default: "zFoto", template: "%s | zFoto" },
  description:
    "Vill du se de senaste bilderna från Z-Teknologsektionens arrangemang? Då är du på rätt ställe, här finns mängder av bilder att tillgå!",
  icons: {
    icon: [
      {
        url: "/zFoto.ico",
      },
      {
        url: "/zFoto.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: {
      url: "/zFoto.svg",
      type: "image/svg+xml",
    },
    apple: {
      url: "/zFoto.svg",
      type: "image/svg+xml",
    },
  },
  metadataBase: new URL(env.NEXTAUTH_URL),
  twitter: {
    card: "summary_large_image",
  },
};

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="sv">
    <body className="">
      <Providers>
        <Toaster position="top-center" reverseOrder={false} />
        <Fragment>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="my-8 flex grow flex-col">{children}</main>
          </div>
          <Footer />
        </Fragment>
        <Analytics />
      </Providers>
    </body>
  </html>
);

export default BaseLayout;
