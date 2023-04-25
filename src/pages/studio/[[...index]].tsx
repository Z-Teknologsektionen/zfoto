/* eslint-disable import/no-unresolved */
import type { NextPage } from "next";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import Head from "next/head";

import config from "../../../sanity.config";

const StudioPage: NextPage = () => {
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <NextStudio config={config} />
    </>
  );
};

export default StudioPage;
