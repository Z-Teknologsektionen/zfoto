"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "~/components/data-table/data-table-column-header";
import { CountsPerPhotographerType } from "~/utils/fetchAdminData";
import { formatDateString } from "~/utils/formatDateAndTimeStrings";

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
    },
    {
      accessorKey: "images",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bilder" />
      ),
    },
    {
      accessorKey: "visible",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bilder som visas" />
      ),
    },
    {
      accessorKey: "coverImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Omslag" />
      ),
    },
    {
      accessorKey: "firstImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Första bild" />
      ),
      cell: ({ row }) =>
        row.original.firstImage
          ? formatDateString(row.original.firstImage)
          : "Okänt",
    },
    {
      accessorKey: "latestImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Senaste bild" />
      ),
      cell: ({ row }) =>
        row.original.latestImage
          ? formatDateString(row.original.latestImage)
          : "Okänt",
    },
  ];
