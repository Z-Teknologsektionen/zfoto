"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import DataTableColumnHeader from "~/components/data-table/data-table-column-header";
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
import { AdminAlbumType } from "~/utils/fetchAdminData";
import { formatDateTimeString } from "~/utils/formatDateAndTimeStrings";

export const columns: ColumnDef<AdminAlbumType>[] = [
  {
    accessorKey: "coverImageFilename",
    cell: ({ row }) => {
      return (
        <div className="relative h-24 w-36">
          <Image
            alt={`Omslagsbild till: ${row.original.title}`}
            className="object-contain object-center"
            src={`/img/thumb/${row.original.coverImageFilename || ""}`}
            fill
            unoptimized
          />
        </div>
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Omslagsbild"
        sortable={false}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titel" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datum" />
    ),
    cell: ({ row }) => formatDateTimeString(row.original.date),
  },
  {
    accessorKey: "visible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visas" />
    ),
    cell: ({ row }) => (row.original.visible ? "Ja" : "Nej"),
  },
  {
    accessorKey: "isReception",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mottagning" />
    ),
    cell: ({ row }) => (row.original.isReception ? "Ja" : "Nej"),
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Antal bilder" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ctx = trpc.useContext();
      const { mutate: updateAlbum, isLoading } =
        trpc.album.updateAlbumById.useMutation({
          onMutate: () => toast.loading("Uppdaterar album"),
          onSettled(_, __, ___, context) {
            toast.dismiss(context);
            ctx.album.invalidate();
            ctx.image.invalidate();
          },
          onSuccess() {
            toast.success("Album uppdaterat!");
          },
          onError(error) {
            toast.error("Kunde inte uppdatera, försök igen senare...");
            toast.error(error.message);
          },
        });

      const album = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
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
              <Link href={`/albums/${album.id}`}>Öppna album</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="underline underline-offset-2">
              Admin
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/albums/${album.id}`}>Redigera album</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                updateAlbum({ albumId: album.id, visible: !album.visible })
              }
            >
              {`${album.visible ? "Dölj" : "Visa"} album`}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                updateAlbum({
                  albumId: album.id,
                  isReception: !album.isReception,
                })
              }
            >
              {`Sätt ${album.isReception ? "ej" : "är"} mottagningsalbum`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
