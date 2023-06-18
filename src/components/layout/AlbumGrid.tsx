import type { FC, PropsWithChildren } from "react";

interface IAlbumGrid {
  className?: string;
}

const AlbumGrid: FC<PropsWithChildren<IAlbumGrid>> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 place-items-center gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default AlbumGrid;
