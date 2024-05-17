import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";

type DataTableColumnHeaderProps = {
  title: string;
  column: Column<any, any>;
  sortable?: boolean;
};

export const DataTableColumnHeader: FC<DataTableColumnHeaderProps> = ({
  column,
  title,
  sortable = true,
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {sortable && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );
};
