import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { trpc } from "~/utils/trpc";

const MyApp: AppType<{
  session: Session;
}> = ({ pageProps, Component }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>zFoto</title>
        <link href="/zFoto.svg" rel="icon" />
        <meta
          content="Vill du se de senaste bilderna från Z-teknologsektionens arrangemang? Då är du på rätt ställe, här finns mängder av bilder att tillgå!"
          name="description"
        />
        <meta content="*" httpEquiv="Access-Control-Allow-Origin" />
      </Head>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          error: { duration: 5000 },
          loading: { duration: 750 },
          success: { duration: 3000 },
        }}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
