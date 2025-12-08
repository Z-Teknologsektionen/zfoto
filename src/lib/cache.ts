/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

const GLOBAL_CACHE_TAG = "*all";

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getIdTag>;

export const CACHE_TAGS = {
  albums: "albums",
  images: "images",
  users: "users",
} as const;

export const getGlobalTag = (tag: keyof typeof CACHE_TAGS) =>
  `global:${CACHE_TAGS[tag]}` as const;

export const getIdTag = (id: string, tag: keyof typeof CACHE_TAGS) =>
  `id:${id}-${CACHE_TAGS[tag]}` as const;

export const clearFullCache = () => {
  revalidateTag(GLOBAL_CACHE_TAG, "max");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dbCache = <T extends (...args: any[]) => Promise<any>>(
  cb: Parameters<typeof unstable_cache<T>>[0],
  { tags, revalidate }: { tags: ValidTags[]; revalidate?: number | false },
) =>
  cache(
    unstable_cache<T>(cb, undefined, {
      tags: [...tags, GLOBAL_CACHE_TAG],
      revalidate: revalidate ?? 60 * 24 * 24,
    }),
  );

export const revalidateDbCache = ({
  tag,
  id,
  ids,
}: {
  tag: keyof typeof CACHE_TAGS;
  id?: string;
  ids?: string[];
}) => {
  revalidateTag(getGlobalTag(tag), "max");
  if (id !== undefined) revalidateTag(getIdTag(id, tag), "max");
  if (ids !== undefined) {
    ids.forEach((id) => {
      revalidateTag(getIdTag(id, tag), "max");
    });
  }
};
