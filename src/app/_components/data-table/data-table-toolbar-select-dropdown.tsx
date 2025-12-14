import type { Column } from "@tanstack/react-table";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/utils/utils";

type ToolbarSelectDropdownProps<TData> = {
  className?: string;
  placeholder: string;
  column: Column<TData, unknown> | undefined;
  size?: "2xl" | "3xl" | "default" | "lg" | "sm" | "xl";
  options: { value: string; label: string }[];
};

export const ToolbarSelectDropdown = <TData,>({
  column,
  placeholder,
  className = "",
  size = "default",
  options,
}: ToolbarSelectDropdownProps<TData>): JSX.Element => {
  if (column === undefined) throw new Error("No column found");

  return (
    <Select
      onValueChange={(value) => {
        column.setFilterValue(value === "all" ? "" : value);
      }}
      defaultValue="all"
    >
      <SelectTrigger
        className={cn(
          size === "sm" && "w-[100px]",
          size === "default" && "w-[150px]",
          size === "lg" && "w-[200px]",
          size === "xl" && "w-[250px]",
          size === "2xl" && "w-[300px]",
          size === "3xl" && "w-[350px]",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-fit max-h-48">
          <SelectItem value="all">Alla</SelectItem>
          {options.map(({ label, value }) => (
            <SelectItem
              className="pointer-events-auto cursor-pointer"
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};
