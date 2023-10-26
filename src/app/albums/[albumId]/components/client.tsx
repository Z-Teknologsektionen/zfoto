"use client";

import Link from "next/link";
import { FC, useEffect } from "react";
import AlbumGrid from "~/components/albums/album-grid";
import { AlbumGridItem } from "~/components/albums/album-grid-item";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { PublicAlbum, PublicAlbums } from "~/utils/fetchAlbumData";
import { useCounter } from "~/utils/useCounter";
import { useToggle } from "~/utils/useToggle";
import { ImageGridItem } from "./image-grid-item";
import ImagePopup from "./image-popup";

const Client: FC<{ album: PublicAlbum; recommendedAlbums: PublicAlbums }> = ({
  album,
  recommendedAlbums,
}) => {
  const {
    value: imageIndex,
    decrement: decrementImageIndex,
    increment: incrementImageIndex,
    setNumber: setImageIndex,
  } = useCounter();
  const [showPopup, togglePopup] = useToggle(false);

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <SectionWrapper className="grid grid-cols-2 place-items-center gap-x-2 gap-y-4 space-y-0 md:grid-cols-3 lg:grid-cols-5">
        {album.images.map(({ id, filename }, idx) => (
          <ImageGridItem
            key={id}
            {...{
              id,
              albumId: album.id,
              filename,
              album,
              priority: idx < 10,
            }}
            onClick={() => {
              togglePopup();
              setImageIndex(idx);
              document.body.classList.add("overflow-hidden");
            }}
          />
        ))}
      </SectionWrapper>
      <SectionWrapper>
        <h1 className="text-2xl font-medium">Kika även in dessa albumen</h1>
        <AlbumGrid>
          {recommendedAlbums.map((recommendedAlbum) => (
            <AlbumGridItem key={recommendedAlbum.id} {...recommendedAlbum} />
          ))}
          <Link
            className="relative grid h-full w-full max-w-xs flex-grow items-center justify-center overflow-hidden rounded-lg border-2 bg-[#333333]/95 px-4 py-3 text-[#a7a7a7] shadow"
            href="/"
          >
            <h2 className="text-xl font-normal">Visa fler...</h2>
          </Link>
        </AlbumGrid>
      </SectionWrapper>
      {showPopup && (
        <ImagePopup
          {...{
            album,
            showPopup,
            imageIndex,
            decrementImageIndex,
            incrementImageIndex,
          }}
          closePopup={() => {
            togglePopup();
            document.body.classList.remove("overflow-hidden");
          }}
        />
      )}
    </>
  );
};

export default Client;
