"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { ImageColumnActions } from "~/components/data-table/data-table-image-actions";
import { formatDateTimeString } from "~/utils/date-utils";
import { AdminTableImageType } from "~/utils/fetchAdminData";
import { getFullFilePath } from "~/utils/utils";

export const imageColumns: ColumnDef<AdminTableImageType>[] = [
  {
    accessorKey: "image",
    cell: ({ row }) => {
      return (
        <div className="relative h-24 w-36">
          <Image
            alt={`Bild: ${row.original.filename}, Foto: ${row.original.photographer}`}
            className="object-contain object-center"
            src={getFullFilePath(row.original.filename, "thumb")}
            fill
            unoptimized
          />
        </div>
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bild" sortable={false} />
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
    cell: ({ row }) => formatDateTimeString(row.original.date),
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
    cell: ({ row }) => (row.original.visible ? "Ja" : "Nej"),
  },
  {
    accessorKey: "coverImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Omslagsbild" />
    ),
    cell: ({ row }) => (row.original.coverImage ? "Ja" : "Nej"),
  },
  {
    accessorKey: "albumTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Album" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ImageColumnActions {...row.original} />,
  },
];
