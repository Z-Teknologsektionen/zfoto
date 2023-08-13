"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "~/components/data-table/data-table-column-header";
import { CountsPerPhotographerType } from "~/utils/fetchAdminData";
import { formatDateTimeString } from "~/utils/formatDateAndTimeStrings";

export const columns: ColumnDef<CountsPerPhotographerType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
  },
  {
    accessorKey: "album",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Antal Album" />
    ),
  },
  {
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Antal bilder" />
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
      <DataTableColumnHeader column={column} title="Antal omslag" />
    ),
  },
  {
    accessorKey: "firstImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Första bild" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.firstImage
            ? formatDateTimeString(row.original.firstImage)
            : "Okänd"}
        </div>
      );
    },
  },
  {
    accessorKey: "latestImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Senaste bild" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.latestImage
            ? formatDateTimeString(row.original.latestImage)
            : "Okänd"}
        </div>
      );
    },
  },
];
