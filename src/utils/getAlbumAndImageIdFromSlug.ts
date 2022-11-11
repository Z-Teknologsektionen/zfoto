export const getAlbumAndImageIdFromSlug = (
  slug: string | string[] | undefined
): { albumId: string; imageId: string } => {
  let albumId = "",
    imageId = "";
  if (typeof slug === "string") {
    albumId = slug;
  } else if (slug?.length === 1) {
    albumId = slug[0] || "";
  } else if (slug?.length === 3 && slug[1] === "image") {
    imageId = slug[2] || "";
  }

  return { albumId, imageId };
};
