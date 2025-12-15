"use client";

import type { AdminImageType } from "@/types/data-access";
import type { DataTableToolBarProps } from "~/components/data-table/data-table";
import { useMemo } from "react";
import { ToolbarComboboxDropdown } from "~/components/data-table/data-table-toolbar-combobox-dropdown";
import { ToolbarGroup } from "~/components/data-table/data-table-toolbar-group";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar-wrapper";
import { UpdateManyImagesDialog } from "./update-many-images-dialog";

export const ImagesFilteringToolbar = ({
  table,
}: DataTableToolBarProps<AdminImageType>): JSX.Element => {
  const photographers = useMemo(() => {
    const values: string[] = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue("photographer"));
    return Array.from(new Set(values));
  }, [table]);

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <ToolbarWrapper>
      <ToolbarGroup>
        <ToolbarTextInput
          column={table.getColumn("filename")}
          placeholder="Filtrera efter filnamn..."
        />
        <ToolbarComboboxDropdown
          noOptionsText="Inga fotografer"
          column={table.getColumn("photographer")}
          options={photographers.map((name) => ({
            label: name,
            value: name.toLowerCase(),
          }))}
          placeholder="Välj fotograf"
          size="2xl"
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <UpdateManyImagesDialog
          key={selectedRows.toString()}
          selectedRows={selectedRows}
        />
      </ToolbarGroup>
    </ToolbarWrapper>
  );
};
