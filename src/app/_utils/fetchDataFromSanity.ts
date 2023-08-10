import { env } from "@/env/client.mjs";
import { createClient } from "next-sanity";
import type { PortableTextBlock } from "sanity";

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_ID,
  dataset: env.NEXT_PUBLIC_DATASET,
  apiVersion: env.NEXT_PUBLIC_API_VERSION,
  useCdn: false,
});

export type PagePayload = {
  content: PortableTextBlock[];
  slug: string;
  title: string;
};

export const getPageBySlug = (
  slug: string,
): Promise<PagePayload | undefined> => {
  return client.fetch(`*[_type == "page" && slug.current == "${slug}"]{
  title, slug, content
}[0]`);
};

export const getSettings = (): Promise<{
  description: string;
  title: string;
}> => {
  return client.fetch(`*[_type == 'siteSettings' && _id== 'siteSettings'][0]`);
};
