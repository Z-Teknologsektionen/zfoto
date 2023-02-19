import { defineCliConfig } from "sanity/cli";
import { env } from "./src/env/client.mjs";

export default defineCliConfig({
  api: {
    projectId: env.NEXT_PUBLIC_SANITY_ID,
    dataset: env.NEXT_PUBLIC_DATASET,
  },
});
