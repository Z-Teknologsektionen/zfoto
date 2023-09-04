import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

const DataTableColumnHeader = ({
  column,
  title,
  sortable = true,
}: {
  title: string;
  column: Column<any, any>;
  sortable?: boolean;
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

export default DataTableColumnHeader;
