"use client";

import type { Column } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/utils/utils";

type ToolbarSelectComboboxProps<TData> = {
  placeholder: string;
  noOptionsText: string;
  column: Column<TData, unknown> | undefined;
  size?: "2xl" | "3xl" | "default" | "lg" | "sm" | "xl";
  options: { value: string; label: string }[];
};

// eslint-disable-next-line max-lines-per-function
export const ToolbarComboboxDropdown = <TData,>({
  column,
  options,
  placeholder,
  noOptionsText,
  size,
}: ToolbarSelectComboboxProps<TData>): JSX.Element => {
  const [open, setOpen] = useState(false);

  if (column === undefined) throw new Error("No column found");
  const filterValue = column.getFilterValue();

  if (
    !(
      typeof filterValue === "string" ||
      filterValue === undefined ||
      filterValue === null
    )
  )
    throw new Error("Combobox can only be used for strings");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between",
            size === "sm" && "w-[100px]",
            size === "default" && "w-[150px]",
            size === "lg" && "w-[200px]",
            size === "xl" && "w-[250px]",
            size === "2xl" && "w-[300px]",
            size === "3xl" && "w-[350px]",
          )}
        >
          {options.find((option) => option.value === column.getFilterValue())
            ?.label ?? placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "p-0",
          size === "sm" && "w-[100px]",
          size === "default" && "w-[150px]",
          size === "lg" && "w-[200px]",
          size === "xl" && "w-[250px]",
          size === "2xl" && "w-[300px]",
          size === "3xl" && "w-[350px]",
        )}
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{noOptionsText}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  column.setFilterValue("");
                  setOpen(false);
                }}
              >
                Alla
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    column.setFilterValue(
                      currentValue !== column.getFilterValue()
                        ? currentValue
                        : "",
                    );
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
