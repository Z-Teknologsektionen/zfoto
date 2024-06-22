"use client";

import type { DataTableToolBarProps } from "~/components/data-table/data-table";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar-wrapper";

export const AlbumsFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>): JSX.Element => (
  <ToolbarWrapper>
    <ToolbarTextInput
      placeholder="Filtrera efter titel..."
      column={table.getColumn("title")}
    />
  </ToolbarWrapper>
);
