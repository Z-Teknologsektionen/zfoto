import { type AppType } from "next/app";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/globals.css";
import { getSettings } from "../utils/fetchDataFromSanity";
import { trpc } from "../utils/trpc";

// TODO: Lägg till länk tillbaka till ztek.se

const MyApp: AppType<{ description: string; title: string }> = ({
  pageProps,
  Component,
}) => {
  return (
    <>
      <Head>
        <title>zFoto</title>
        <link href="/zFoto.svg" rel="icon" />
        <meta content="Generated by create-t3-app" name="description" />
        <meta content="*" httpEquiv="Access-Control-Allow-Origin" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="my-8 flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default trpc.withTRPC(MyApp);

MyApp.getInitialProps = async () => {
  const res = await getSettings();
  return { ...res }; // this will be passed to the page component as props
};
