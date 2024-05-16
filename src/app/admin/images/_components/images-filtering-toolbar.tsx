"use client";

import { useMemo } from "react";
import { DataTableToolBarProps } from "~/components/data-table/data-table";
import { ToolbarGroup } from "~/components/data-table/data-table-toolbar/toolbar-group";
import { ToolbarSelectDropdown } from "~/components/data-table/data-table-toolbar/toolbar-select-dropdown";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar/toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar/toolbar-wrapper";

export const ImagesFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>) => {
  const photographers = useMemo(() => {
    const values = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue("photographer")) as string[];
    return Array.from(new Set(values));
  }, [table]);
  return (
    <ToolbarWrapper>
      <ToolbarGroup>
        <ToolbarTextInput
          column={table.getColumn("filename")}
          placeholder="Filtrera efter filnamn..."
        />
        <ToolbarSelectDropdown
          column={table.getColumn("photographer")}
          options={photographers.map((name) => ({ label: name, value: name }))}
          placeholder="Välj fotograf"
          size="2xl"
        />
      </ToolbarGroup>
    </ToolbarWrapper>
  );
};
