import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUpdateImageById } from "~/hooks/use-update-image-by-id";

type ImageColumnActionsProps = {
  id: string;
  albumId: string;
  isCoverImage: boolean;
  isVisible: boolean;
};

export const ImageColumnActions: FC<ImageColumnActionsProps> = ({
  id,
  albumId,
  isVisible,
  isCoverImage,
}) => {
  const { execute: updateImage, status } = useUpdateImageById();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-8 p-0"
          variant="ghost"
          disabled={status === "executing"}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="underline underline-offset-2">
          Alla
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={`/image/${id}`}>Öppna bild</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/albums/${id}`}>Öppna album</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="underline underline-offset-2">
          Admin
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={`/admin/albums/${albumId}`}>Redigera album</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/admin/images/${id}`}>Redigera bild</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateImage({ imageId: id, visible: !isVisible });
          }}
        >
          {`${isVisible ? "Dölj" : "Visa"} bild`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateImage({ imageId: id, coverImage: !isCoverImage });
          }}
        >
          {`${isCoverImage ? "Dölj" : "Sätt"} omslag`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
