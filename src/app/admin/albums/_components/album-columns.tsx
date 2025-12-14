"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AdminAlbumType } from "@/types/data-access";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Checkbox } from "~/components/ui/checkbox";
import {
  formatDateTimeString,
  getLocalDateTimeFromUTC,
} from "~/utils/date-utils";
import { getFullFilePath } from "~/utils/utils";
import { AlbumColumnActions } from "./album-column-actions";

export const albumColumns: ColumnDef<AdminAlbumType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(value === true);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value === true);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "coverImageFilename",
    cell: ({ row }) => (
      <Link
        href={`/albums/${row.original.id}`}
        className="relative block h-24 w-36"
      >
        <Image
          alt={`Omslagsbild till: ${row.original.title}`}
          className="object-contain object-center"
          src={getFullFilePath(row.original.coverImageFilename ?? "", "thumb")}
          fill
          unoptimized
        />
      </Link>
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
    cell: ({ row }) =>
      formatDateTimeString(getLocalDateTimeFromUTC(row.original.date)),
  },
  {
    accessorKey: "visible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visas" />
    ),
    cell: ({ row }) => (row.original.isVisible ? "Ja" : "Nej"),
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
    cell: ({ row }) => <AlbumColumnActions album={row.original} />,
  },
];
