"use client";

import { Roles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import DataTableColumnHeader from "~/components/data-table/data-table-column-header";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { AdminUser } from "~/utils/fetchAdminData";

export const columns: ColumnDef<AdminUser>[] = [
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
      return role.slice(0, 1).toUpperCase() + role.slice(1).toLowerCase();
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
            <DropdownMenuLabel className="underline underline-offset-2">
              Admin
            </DropdownMenuLabel>
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
                  <span>{`Sätt till "${key.toUpperCase().at(0)}${key
                    .toLowerCase()
                    .slice(1)}"`}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
