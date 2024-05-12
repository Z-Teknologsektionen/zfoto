/* eslint-disable import/no-unresolved */
import type { NextPage } from "next";
import { NextStudio, metadata } from "next-sanity/studio";
import Head from "next/head";

import config from "../../../sanity.config";

const StudioPage: NextPage = () => {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head>
      <NextStudio config={config} />
    </>
  );
};

export default StudioPage;
