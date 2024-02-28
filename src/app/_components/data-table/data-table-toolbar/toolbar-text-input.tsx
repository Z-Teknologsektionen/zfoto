import { Column } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils/utils";

const ToolbarTextInput = <TData,>({
  column,
  placeholder,
  className,
}: {
  className?: string;
  placeholder: string;
  column: Column<TData, unknown> | undefined;
}) => {
  if (!column) throw new Error("No column found");

  return (
    <Input
      className={cn("max-w-sm", className)}
      onChange={(event) => column.setFilterValue(event.target.value)}
      placeholder={placeholder}
      value={column.getFilterValue() as string}
    />
  );
};

export default ToolbarTextInput;
