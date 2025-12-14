import type { Column } from "@tanstack/react-table";
import type { FC } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

type DataTableColumnHeaderProps = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
  isSortable?: boolean;
};

export const DataTableColumnHeader: FC<DataTableColumnHeaderProps> = ({
  column,
  title,
  isSortable = true,
}) => (
  <Button
    variant="ghost"
    onClick={() => {
      column.toggleSorting(column.getIsSorted() === "asc");
    }}
  >
    {title}
    {isSortable && <ArrowUpDown className="ml-2 size-4" />}
  </Button>
);
