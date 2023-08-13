"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { AdminAlbumImageType } from "~/utils/fetchAdminData";
import { formatDateTimeString } from "~/utils/formatDateAndTimeStrings";

export const columns: ColumnDef<AdminAlbumImageType>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="relative h-24 w-36">
          <Image
            alt={`Bild: ${row.original.filename}, Foto: ${row.original.photographer}`}
            className="object-contain object-center"
            src={`/images/thumb/${row.original.filename}`}
            fill
            unoptimized
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Filnamn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatDateTimeString(row.original.date)}</div>;
    },
  },
  {
    accessorKey: "photographer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fotograf
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "visible",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.visible ? "Ja" : "Nej"}</div>;
    },
  },
  {
    accessorKey: "coverImage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Omslagsbild
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.coverImage ? "Ja" : "Nej"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const image = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
              <Link href={`/image/${image.id}`}>Öppna bild</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="underline underline-offset-2">
              Admin
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                const res = await fetch(`/api/images/${image.id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ visible: !image.visible }),
                });
                if (!res.ok) {
                  return toast.error(
                    "Kunde inte uppdatera, försök igen senare..",
                  );
                }
                router.refresh();
                toast.success("Uppdaterat!");
              }}
            >
              {`${image.visible ? "Dölj" : "Visa"} bild`}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const res = await fetch(`/api/images/${image.id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ coverImage: !image.coverImage }),
                });
                if (!res.ok) {
                  return toast.error(
                    "Kunde inte uppdatera, försök igen senare..",
                  );
                }
                router.refresh();
                toast.success("Uppdaterat!");
              }}
            >
              {`${image.coverImage ? "Dölj" : "Sätt"} omslag`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
