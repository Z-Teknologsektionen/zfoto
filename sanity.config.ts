import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { env } from "./src/env/client.mjs";

export default defineConfig({
  basePath: "/studio",
  name: "zFoto_Content_Manager",
  title: "zFoto Content Manager",

  projectId: env.NEXT_PUBLIC_SANITY_ID,
  dataset: env.NEXT_PUBLIC_DATASET,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
