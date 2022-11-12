import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AlbumGrid } from "../../components/albumGrid/AlbumGrid";
import { ImagePage } from "../../components/imageGrid/ImagePage";
import { getAlbumAndImageIdFromSlug } from "../../utils/getAlbumAndImageIdFromSlug";

const AlbumPage: NextPage = () => {
  const router = useRouter();
  const loadTime = new Date().getTime();
  const { albumId, imageId } = getAlbumAndImageIdFromSlug(router.query.slug);

  return (
    <>
      {imageId ? (
        <ImagePage imageId={imageId} albumId={albumId} />
      ) : albumId ? (
        <AlbumGrid albumId={albumId} />
      ) : loadTime - new Date().getTime() < 500 ? (
        <section className="mx-auto max-w-7xl py-5 px-10">Laddar...</section>
      ) : (
        "error..."
      )}
    </>
  );
};

export default AlbumPage;
