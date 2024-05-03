import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { trpc } from "~/trpc/client";

const ImageColumnActions: FC<{
  id: string;
  albumId: string;
  coverImage: boolean;
  visible: boolean;
}> = ({ id, albumId, visible, coverImage }) => {
  const ctx = trpc.useUtils();
  const { mutate: updateImage, isLoading } =
    trpc.image.updateImageById.useMutation({
      onMutate: () => toast.loading("Uppdaterar bild"),
      onSettled(_, __, ___, context) {
        toast.dismiss(context);
        ctx.image.invalidate();
        ctx.album.invalidate();
      },
      onSuccess() {
        toast.success("Bild uppdaterad!");
      },
      onError(e) {
        toast.error("Kunde inte uppdatera, försök igen senare...");
        toast.error(e.message);
      },
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
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
          onClick={() => updateImage({ imageId: id, visible: !visible })}
        >
          {`${visible ? "Dölj" : "Visa"} bild`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateImage({ imageId: id, coverImage: !coverImage })}
        >
          {`${coverImage ? "Dölj" : "Sätt"} omslag`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImageColumnActions;
