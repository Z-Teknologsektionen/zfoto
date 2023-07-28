import Link from "next/link";
import { AlbumGridItem } from "~/components/albumGrid/AlbumGridItem";
import AlbumGrid from "~/components/layout/AlbumGrid";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";
import { getLatestAlbums } from "~/utils/fetchAlbumData";

const HomePage = async () => {
  const albums = await getLatestAlbums({ count: 12 });

  return (
    <>
      <SectionWrapper className="space-y-8">
        <h1 className="py-8 text-center text-2xl font-medium">
          Välkommen till zFoto
        </h1>
        <AlbumGrid>
          {albums.map(({ id, title, date, coverImageFilename }, idx) => (
            <AlbumGridItem
              key={id}
              {...{
                id,
                title,
                coverImageFilename,
                priorityLoadning: idx < 10,
                date,
              }}
            />
          ))}
        </AlbumGrid>
        <div className="mx-auto w-fit">
          <Button asChild variant="default" size="lg" className="leading-none">
            <Link href={"/albums"}>Visa fler</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
};

export default HomePage;
