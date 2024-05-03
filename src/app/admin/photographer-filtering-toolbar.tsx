"use client";

import { DataTableToolBarProps } from "~/components/data-table/data-table";
import ToolbarTextInput from "~/components/data-table/data-table-toolbar/toolbar-text-input";
import ToolbarWrapper from "~/components/data-table/data-table-toolbar/toolbar-wrapper";

const PhotographerFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>): JSX.Element => {
  return (
    <ToolbarWrapper>
      <ToolbarTextInput
        column={table.getColumn("name")}
        placeholder="Filtrera efter namn..."
      />
    </ToolbarWrapper>
  );
};

export default PhotographerFilteringToolbar;
