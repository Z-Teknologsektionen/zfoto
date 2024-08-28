"use client";

import type { getAllAlbumsAsAdmin } from "@/server/data-access/albums";
import type { Prisma } from "@prisma/client";
import type { DataTableToolBarProps } from "~/components/data-table/data-table";
import { ToolbarGroup } from "~/components/data-table/data-table-toolbar-group";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar-wrapper";
import { UpdateManyAlbumsDialog } from "./update-many-albums-dialog";

type AdminAlbumType = Prisma.PromiseReturnType<typeof getAllAlbumsAsAdmin>[0];

export const AlbumsFilteringToolbar = ({
  table,
}: DataTableToolBarProps<AdminAlbumType>): JSX.Element => {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <ToolbarWrapper>
      <ToolbarGroup>
        <ToolbarTextInput
          placeholder="Filtrera efter titel..."
          column={table.getColumn("title")}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <UpdateManyAlbumsDialog selectedRows={selectedRows} />
      </ToolbarGroup>
    </ToolbarWrapper>
  );
};
