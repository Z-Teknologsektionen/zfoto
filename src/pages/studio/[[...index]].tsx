import type { NextPage } from "next";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import Head from "next/head";

import config from "../../../sanity.config";

const StudioPage = (): NextPage => {
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <div className="absolute inset-0">
        <NextStudio config={config} />
      </div>
    </>
  );
};

export default StudioPage;
