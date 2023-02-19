import { createClient } from "next-sanity";
import type { PortableTextBlock } from "sanity";
import { env } from "../env/client.mjs";

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

export async function getPageBySlug(
  slug: string
): Promise<PagePayload | undefined> {
  return client.fetch(`*[_type == "page" && slug.current == "${slug}"]{
  title, slug, content
}[0]`);
}
