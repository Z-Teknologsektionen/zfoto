"use client";

import { Roles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { AdminUser } from "~/utils/fetchAdminData";
import { formatRole } from "../_utils/formatUserRole";

export const userColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "image",
    cell: ({ row }) => {
      return (
        <div className="relative h-16 w-16">
          <Image
            alt={`Profilbild på ${row.original.name}`}
            className="rounded-full object-contain object-center"
            src={row.original.image || ""}
            fill
            unoptimized
          />
        </div>
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Profilbild"
        sortable={false}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Epost" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roll" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      return formatRole(role);
    },
    filterFn: (row, id, value) => {
      const filterString = z.string().toUpperCase().parse(value);
      if (filterString === "ALL") return true;
      return filterString === row.original.role;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            {(Object.keys(Roles) as Array<keyof typeof Roles>).map((key) => {
              if (key === row.original.role) return;
              return (
                <DropdownMenuItem
                  key={key}
                  onClick={async () => {
                    const res = await fetch(`/api/users/${row.original.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ role: key }),
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
                  <span>{`Ge roll "${formatRole(key)}"`}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
