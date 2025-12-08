"use client";

import type { AdminAlbumType } from "@/types/data-access";
import { ReactNode } from "react";
import type { DataTableToolBarProps } from "~/components/data-table/data-table";
import { ToolbarGroup } from "~/components/data-table/data-table-toolbar-group";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar-wrapper";
import { UpdateManyAlbumsDialog } from "./update-many-albums-dialog";

export const AlbumsFilteringToolbar = ({
  table,
}: DataTableToolBarProps<AdminAlbumType>): ReactNode => {
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
