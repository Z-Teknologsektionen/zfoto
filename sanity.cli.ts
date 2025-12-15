import { defineCliConfig } from "sanity/cli";
import { env } from "@/env.mjs";

export default defineCliConfig({
  api: {
    projectId: env.NEXT_PUBLIC_SANITY_ID,
    dataset: env.NEXT_PUBLIC_DATASET,
  },
});
