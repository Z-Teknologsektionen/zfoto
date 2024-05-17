"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableCell } from "~/components/data-table/data-table-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { formatDateTimeString } from "~/utils/date-utils";
import { CountsPerPhotographerType } from "~/utils/fetchAdminData";

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
          {row.original.firstImage
            ? formatDateTimeString(row.original.firstImage)
            : "Okänd"}
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
          {row.original.latestImage
            ? formatDateTimeString(row.original.latestImage)
            : "Okänd"}
        </DataTableCell>
      ),
    },
  ];
