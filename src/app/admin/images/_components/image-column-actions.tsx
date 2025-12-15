import type { FC } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useUpdateImageById } from "@/app/admin/_hooks/use-update-image-by-id";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
        <DropdownMenuItem asChild>
          <Link href={`/image/${id}`}>Öppna bild</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/albums/${id}`}>Öppna album</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="underline underline-offset-2">
          Admin
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/albums/${albumId}`}>Redigera album</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/images/${id}`}>Redigera bild</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateImage({ imageId: id, isVisible: !isVisible });
          }}
        >
          {`${isVisible ? "Dölj" : "Visa"} bild`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            updateImage({ imageId: id, isCoverImage: !isCoverImage });
          }}
        >
          {`${isCoverImage ? "Dölj" : "Sätt"} omslag`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
