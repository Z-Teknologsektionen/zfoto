import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { env } from "@/env.mjs";
import { deskToolStructure } from "~/utils/deskToolStructure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  basePath: "/studio",
  name: "zFoto_Manager",
  title: "zFoto Manager",

  projectId: env.NEXT_PUBLIC_SANITY_ID,
  dataset: env.NEXT_PUBLIC_DATASET,

  plugins: [
    deskToolStructure,
    visionTool({
      defaultApiVersion: env.NEXT_PUBLIC_API_VERSION,
      defaultDataset: env.NEXT_PUBLIC_DATASET,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
