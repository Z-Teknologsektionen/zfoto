import { notFound } from "next/navigation";
import BackButton from "~/components/back-button";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { getAlbumById, getLatestAlbums } from "~/utils/fetchAlbumData";
import AlbumInfo from "./components/album-info";
import Client from "./components/client";

const AlbumPage = async ({ params }: { params: { albumId: string } }) => {
  const albumId = params.albumId;

  const album = await getAlbumById(albumId).catch(() => {
    return notFound();
  });

  const recommendedAlbums = await getLatestAlbums({
    count: 3,
    notIds: [],
  });

  const photographers = [
    ...new Set(album?.images.map((item) => item.photographer)),
  ];

  return (
    <>
      <SectionWrapper className="flex flex-col gap-2">
        <BackButton />
        <AlbumInfo
          date={album.date}
          photographers={photographers}
          title={album.title}
        />
        <Client
          album={album}
          recommendedAlbums={recommendedAlbums}
          key={albumId}
        />
      </SectionWrapper>
    </>
  );
};

export default AlbumPage;
