import type { FC, PropsWithChildren } from "react";

type AlbumGridProps = {
  className?: string;
};

export const AlbumGrid: FC<PropsWithChildren<AlbumGridProps>> = ({
  children,
  className = "",
}) => (
  <div
    className={`grid grid-cols-1 place-items-center gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
  >
    {children}
  </div>
);
