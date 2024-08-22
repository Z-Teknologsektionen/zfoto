/* eslint-disable import/no-unresolved */
import type { NextPage } from "next";
import { NextStudio, metadata } from "next-sanity/studio";
import Head from "next/head";

import { Fragment } from "react";
import config from "../../../sanity.config";

const StudioPage: NextPage = () => (
  <Fragment>
    <Head>
      {Object.entries(metadata).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Head>
    <NextStudio config={config} />
  </Fragment>
);

export default StudioPage;
