"use client";

import type { getCountsPerPhotographer } from "@/server/data-access/photographers";
import type { Prisma } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCell } from "~/components/data-table/data-table-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { formatDateTimeString } from "~/utils/date-utils";

type CountsPerPhotographerType = Prisma.PromiseReturnType<
  typeof getCountsPerPhotographer
>[0];

export const adminPhotographerColumns: ColumnDef<CountsPerPhotographerType>[] =
  [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Namn" />
      ),
    },
    {
      accessorKey: "album",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Album" />
      ),
      cell: ({ row }) => (
        <DataTableCell center>{row.original.album}</DataTableCell>
      ),
    },
    {
      accessorKey: "images",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bilder" />
      ),
      cell: ({ row }) => (
        <DataTableCell center>{row.original.images}</DataTableCell>
      ),
    },
    {
      accessorKey: "visible",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bilder som visas" />
      ),
      cell: ({ row }) => (
        <DataTableCell center>{row.original.visible}</DataTableCell>
      ),
    },
    {
      accessorKey: "coverImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Omslag" />
      ),
      cell: ({ row }) => (
        <DataTableCell center>{row.original.coverImage}</DataTableCell>
      ),
    },
    {
      accessorKey: "firstImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Första bild" />
      ),
      cell: ({ row }) => (
        <DataTableCell center>
          {row.original.firstImage === undefined
            ? "Okänd"
            : formatDateTimeString(row.original.firstImage)}
        </DataTableCell>
      ),
    },
    {
      accessorKey: "latestImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Senaste bild" />
      ),
      cell: ({ row }) => (
        <DataTableCell center>
          {row.original.latestImage === undefined
            ? "Okänd"
            : formatDateTimeString(row.original.latestImage)}
        </DataTableCell>
      ),
    },
  ];
