"use client";

import type { Column } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils/utils";

type ToolbarTextInputProps<TData> = {
  className?: string;
  placeholder: string;
  column: Column<TData, unknown> | undefined;
};

export const ToolbarTextInput = <TData,>({
  column,
  placeholder,
  className,
}: ToolbarTextInputProps<TData>): ReactNode => {
  if (column === undefined) throw new Error("No column found");

  return (
    <Input
      className={cn("max-w-sm", className)}
      onChange={(event) => {
        column.setFilterValue(event.target.value);
      }}
      placeholder={placeholder}
      value={column.getFilterValue() as string}
    />
  );
};
