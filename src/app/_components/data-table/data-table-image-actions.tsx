import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const ImageColumnActions: FC<{
  id: string;
  albumId: string;
  visible: boolean;
}> = ({ id, albumId, visible }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
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
          onClick={async () => {
            const res = await fetch(`/api/images/${id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ visible: !visible }),
            });
            if (!res.ok) {
              return toast.error("Kunde inte uppdatera, försök igen senare..");
            }
            router.refresh();
            toast.success("Uppdaterat!");
          }}
        >
          {`${visible ? "Dölj" : "Visa"} bild`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImageColumnActions;
