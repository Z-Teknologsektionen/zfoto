import { Column } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/utils/utils";

const ToolbarSelectDropdown = <TData,>({
  column,
  placeholder,
  className = "",
  size = "default",
  options,
}: {
  className?: string;
  placeholder: string;
  column: Column<TData, unknown> | undefined;
  size?: "xl" | "lg" | "default" | "sm";
  options: { value: string; label: string }[];
}) => {
  if (!column) throw new Error("No column found");

  return (
    <Select
      onValueChange={(value) => {
        column.setFilterValue(value !== "all" ? value : "");
      }}
      defaultValue={""}
    >
      <SelectTrigger
        className={cn(
          size === "sm" && "w-[100px]",
          size === "default" && "w-[150px]",
          size === "lg" && "w-[200px]",
          size === "xl" && "w-[250px]",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
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
      </SelectContent>
    </Select>
  );
};

export default ToolbarSelectDropdown;
