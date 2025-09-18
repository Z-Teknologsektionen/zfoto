"use client";

import type { AdminCountsPerPhotographerType } from "@/types/data-access";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCell } from "~/components/data-table/data-table-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { formatDateString, getLocalDateTimeFromUTC } from "~/utils/date-utils";

export const adminPhotographerColumns: ColumnDef<AdminCountsPerPhotographerType>[] =
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
            : formatDateString(
              getLocalDateTimeFromUTC(row.original.firstImage),
            )}
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
            : formatDateString(
              getLocalDateTimeFromUTC(row.original.latestImage),
            )}
        </DataTableCell>
      ),
    },
  ];
