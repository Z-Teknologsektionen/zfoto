"use client";

import type { getAlbumWithImagesAsAdmin } from "@/server/data-access/albums";
import type { Prisma } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { ImageColumnActions } from "~/components/data-table/data-table-image-actions";
import {
  formatDateTimeString,
  getLocalDateTimeFromUTC,
} from "~/utils/date-utils";
import { getFullFilePath } from "~/utils/utils";

type AdminAlbumImageType = Prisma.PromiseReturnType<
  typeof getAlbumWithImagesAsAdmin
>["images"][0];

export const imageColumns: ColumnDef<AdminAlbumImageType>[] = [
  {
    accessorKey: "image",
    cell: ({ row }) => (
      <div className="relative h-24 w-36">
        <Image
          alt={`Bild: ${row.original.filename}, Foto: ${row.original.photographer}`}
          className="object-contain object-center"
          src={getFullFilePath(row.original.filename, "thumb")}
          fill
          unoptimized
        />
      </div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bild" isSortable={false} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filnamn" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datum" />
    ),
    cell: ({ row }) =>
      formatDateTimeString(getLocalDateTimeFromUTC(row.original.date)),
  },
  {
    accessorKey: "photographer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fotograf" />
    ),
  },
  {
    accessorKey: "visible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visas" />
    ),
    cell: ({ row }) => (row.original.isVisible ? "Ja" : "Nej"),
  },
  {
    accessorKey: "coverImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Omslagsbild" />
    ),
    cell: ({ row }) => (row.original.isCoverImage ? "Ja" : "Nej"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ImageColumnActions
        key={row.original.id}
        id={row.original.id}
        albumId={row.original.albumId}
        isCoverImage={row.original.isCoverImage}
        isVisible={row.original.isVisible}
      />
    ),
  },
];
