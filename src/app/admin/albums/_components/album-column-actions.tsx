import type { AdminAlbumType } from "@/types/data-access";
import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUpdateAlbumById } from "../_hooks/use-update-album-by-id";

import Link from "next/link";
import { Button } from "~/components/ui/button";

export const AlbumColumnActions: FC<{ album: AdminAlbumType }> = ({
  album,
}) => {
  const { execute: updateAlbum, status } = useUpdateAlbumById();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={status === "executing"}>
        <Button className="size-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="underline underline-offset-2">
          Alla
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/albums/${album.id}`}>Öppna album</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="underline underline-offset-2">
          Admin
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/albums/${album.id}`}>Redigera album</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateAlbum({ albumId: album.id, isVisible: !album.isVisible });
          }}
        >
          {`${album.isVisible ? "Dölj" : "Visa"} album`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateAlbum({
              albumId: album.id,
              isReception: !album.isReception,
            });
          }}
        >
          {`Sätt ${album.isReception ? "ej" : "är"} mottagningsalbum`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
