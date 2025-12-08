"use client";

import { ReactNode } from "react";
import type { DataTableToolBarProps } from "~/components/data-table/data-table";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar-wrapper";

export const PhotographerFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>): ReactNode => (
  <ToolbarWrapper>
    <ToolbarTextInput
      column={table.getColumn("name")}
      placeholder="Filtrera efter namn..."
    />
  </ToolbarWrapper>
);
