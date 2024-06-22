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
import type { AdminUser } from "~/utils/fetchAdminData";
import { formatRole } from "../_utils/formatUserRole";

export const userColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "image",
    cell: ({ row }) => (
      <div className="relative size-16">
        <Image
          alt={`Profilbild på ${row.original.name}`}
          className="rounded-full object-contain object-center"
          src={row.original.image ?? ""}
          fill
          unoptimized
        />
      </div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Profilbild"
        isSortable={false}
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
    cell: ({ row }) => formatRole(row.original.role),
    filterFn: (row, _id, value) => {
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
            <Button className="size-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.values(Roles).map((role) => {
              if (role === row.original.role) return null;
              return (
                //TODO: Move to server action
                <DropdownMenuItem
                  key={role}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => {
                    const res = await fetch(`/api/users/${row.original.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ role }),
                    });
                    if (!res.ok) {
                      toast.error("Kunde inte uppdatera, försök igen senare..");
                      return;
                    }
                    router.refresh();
                    toast.success("Uppdaterat!");
                    return;
                  }}
                >
                  <span>{`Ge roll "${formatRole(role)}"`}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
