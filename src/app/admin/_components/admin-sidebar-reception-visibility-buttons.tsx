"use client";

import type { FC } from "react";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { useSetReceptionAlbumVisibility } from "../_hooks/use-set-reception-album-visibility";

export const AdminSidebarReceptionVisibilityButtons: FC = () => {
  const {
    execute: updateReceptionAlbumVisibility,
    status: updateVisibilityStatus,
  } = useSetReceptionAlbumVisibility();

  return (
    <Fragment>
      <Button
        className="mx-2"
        size="sm"
        variant="outline"
        disabled={updateVisibilityStatus === "executing"}
        onClick={() => {
          updateReceptionAlbumVisibility({ isVisible: false });
        }}
      >
        Dölj mottagningsalbum
      </Button>
      <Button
        className="mx-2"
        size="sm"
        variant="outline"
        disabled={updateVisibilityStatus === "executing"}
        onClick={() => {
          updateReceptionAlbumVisibility({ isVisible: true });
        }}
      >
        Visa mottagningsalbum
      </Button>
    </Fragment>
  );
};
