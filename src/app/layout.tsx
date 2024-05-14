import { Header } from "@/app/components/header/header";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Providers from "./providers";

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
  twitter: {
    card: "summary_large_image",
  },
};

const BaseLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="sv">
      <body className="">
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="my-8 flex flex-grow flex-col gap-y-8">
                {children}
              </main>
            </div>
            <Footer />
          </>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
};

export default BaseLayout;
