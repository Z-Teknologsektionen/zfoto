"use client";

import { DataTableToolBarProps } from "~/components/data-table/data-table";
import ToolbarTextInput from "~/components/data-table/data-table-toolbar/toolbar-text-input";
import ToolbarWrapper from "~/components/data-table/data-table-toolbar/toolbar-wrapper";

const AlbumsFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>) => {
  return (
    <ToolbarWrapper>
      <ToolbarTextInput
        placeholder="Filtrera efter titel..."
        column={table.getColumn("title")}
      />
    </ToolbarWrapper>
  );
};

export default AlbumsFilteringToolbar;
