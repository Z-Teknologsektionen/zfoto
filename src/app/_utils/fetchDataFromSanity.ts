import type { PortableTextBlock } from "sanity";
import { createClient } from "next-sanity";
import { env } from "@/env.mjs";

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

export const getPageBySlug = async (
  slug: string,
): Promise<PagePayload | undefined> =>
  client.fetch(`*[_type == "page" && slug.current == "${slug}"]{
  title, slug, content
}[0]`);

export const getSettings = async (): Promise<{
  description: string;
  title: string;
}> => client.fetch(`*[_type == 'siteSettings' && _id== 'siteSettings'][0]`);
