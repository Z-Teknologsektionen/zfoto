"use client";

import type { getAllAlbumsAsAdmin } from "@/server/data-access/albums";
import type { Prisma } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { formatDateTimeString } from "~/utils/date-utils";
import { getFullFilePath } from "~/utils/utils";
import { useUpdateAlbumById } from "../_hooks/use-update-album-by-id";

type AdminAlbumType = Prisma.PromiseReturnType<typeof getAllAlbumsAsAdmin>[0];

export const albumColumns: ColumnDef<AdminAlbumType>[] = [
  {
    accessorKey: "coverImageFilename",
    cell: ({ row }) => (
      <div className="relative h-24 w-36">
        <Image
          alt={`Omslagsbild till: ${row.original.title}`}
          className="object-contain object-center"
          src={getFullFilePath(row.original.coverImageFilename ?? "", "thumb")}
          fill
          unoptimized
        />
      </div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Omslagsbild"
        isSortable={false}
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { execute: updateAlbum, status } = useUpdateAlbumById();

      const album = row.original;

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
              onClick={() => {
                updateAlbum({ albumId: album.id, visible: !album.visible });
              }}
            >
              {`${album.visible ? "Dölj" : "Visa"} album`}
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
    },
  },
];
