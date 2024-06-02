import { env } from "@/env.mjs";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: env.NEXT_PUBLIC_SANITY_ID,
    dataset: env.NEXT_PUBLIC_DATASET,
  },
});
