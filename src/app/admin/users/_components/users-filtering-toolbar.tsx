"use client";

import { Roles } from "@prisma/client";
import { DataTableToolBarProps } from "~/components/data-table/data-table";
import { ToolbarGroup } from "~/components/data-table/data-table-toolbar-group";
import { ToolbarSelectDropdown } from "~/components/data-table/data-table-toolbar-select-dropdown";
import { ToolbarTextInput } from "~/components/data-table/data-table-toolbar-text-input";
import { ToolbarWrapper } from "~/components/data-table/data-table-toolbar-wrapper";

export const UsersFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>) => {
  const roleColumn = table.getColumn("role");
  if (!roleColumn) throw new Error("No role column found");

  return (
    <ToolbarWrapper>
      <ToolbarGroup>
        <ToolbarTextInput
          column={table.getColumn("name")}
          placeholder="Filtrera efter namn..."
        />
        <div className="flex flex-row items-center gap-2">
          <span className="hidden md:block">Användartyp</span>
          <ToolbarSelectDropdown
            column={table.getColumn("role")}
            options={Object.values(Roles).map((role) => ({
              value: role,
              label: role,
            }))}
            placeholder="Välj användartyp"
          />
        </div>
      </ToolbarGroup>
    </ToolbarWrapper>
  );
};
