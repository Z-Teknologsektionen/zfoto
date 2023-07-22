"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { formatDateTimeString } from "~/utils/formatDateAndTimeStrings";
import type { Album } from "./page";

export const columns: ColumnDef<Album>[] = [
  {
    accessorKey: "coverImageFilename",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="relative h-24 w-36">
          <Image
            alt={`Omslagsbild till: ${row.original.title}`}
            className="object-contain object-center"
            src={`/images/thumb/${row.original.coverImageFilename || ""}`}
            fill
            unoptimized
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "date",
    header: "Datum",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {formatDateTimeString(row.original.date)}
        </div>
      );
    },
  },
  {
    accessorKey: "visible",
    header: "Visas",
    cell: ({ row }) => {
      return (
        <div className="text-right">{row.original.visible ? "Ja" : "Nej"}</div>
      );
    },
  },
  {
    accessorKey: "isReception",
    header: "Mottagning",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {row.original.isReception ? "Ja" : "Nej"}
        </div>
      );
    },
  },
  {
    accessorKey: "count",
    header: "Antal bilder",
    cell: ({ row }) => {
      return <div className="text-right">{row.original.count}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const album = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
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
              <Link href={`/album/${album.id}`}>Öppna album</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="underline underline-offset-2">
              Admin
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/album/${album.id}`}>Redigera album</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const res = await fetch(`/api/album/${album.id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ visible: !album.visible }),
                });
                if (!res.ok) {
                  return toast.error(
                    "Kunde inte uppdatera, försök igen senare.."
                  );
                }
                router.refresh();
                toast.success("Uppdaterat!");
              }}
            >
              {`${album.visible ? "Dölj" : "Visa"} album`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
