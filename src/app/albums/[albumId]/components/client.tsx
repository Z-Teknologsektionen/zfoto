"use client";

import { FC, useEffect } from "react";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { useCounter } from "~/hooks/useCounter";
import { useToggle } from "~/hooks/useToggle";
import { PublicAlbum } from "~/utils/fetchAlbumData";
import { ImageGridItem } from "./image-grid-item";
import ImagePopup from "./image-popup";

const Client: FC<{ album: PublicAlbum }> = ({ album }) => {
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
