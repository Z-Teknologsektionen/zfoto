import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AlbumGrid } from "../../components/AlbumGrid";
import { ImagePage } from "../../components/ImagePage";
import { getAlbumAndImageIdFromSlug } from "../../utils/getAlbumAndImageIdFromSlug";

const AlbumPage: NextPage = () => {
  const router = useRouter();
  const { albumId, imageId } = getAlbumAndImageIdFromSlug(router.query.slug);

  return (
    <>
      {imageId ? (
        <ImagePage imageId={imageId} albumId={albumId} />
      ) : albumId ? (
        <AlbumGrid albumId={albumId} />
      ) : (
        "error..."
      )}
    </>
  );
};

export default AlbumPage;
