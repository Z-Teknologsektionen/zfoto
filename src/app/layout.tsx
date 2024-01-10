import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Header from "~/components/header";
import authOptions from "~/utils/authOptions";
import "../styles/globals.css";
import { Footer } from "./footer";
import Providers from "./providers";

export const metadata: Metadata = {
  title: { default: "zFoto", template: "%s | zFoto" },
  description:
    "Vill du se de senaste bilderna från Z-teknologsektionens arrangemang? Då är du på rätt ställe, här finns mängder av bilder att tillgå!",
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
  const session = await getServerSession(authOptions);

  return (
    <html lang="sv">
      <body className="">
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <>
            <div className="flex min-h-screen flex-col">
              <Header key={JSON.stringify(session)} session={session} />
              <main className="my-8 flex flex-grow flex-col gap-y-8">
                {children}
              </main>
            </div>
            <Footer key={JSON.stringify(session)} session={session} />
          </>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
};

export default BaseLayout;
