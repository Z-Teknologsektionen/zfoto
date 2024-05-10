import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type DataTableFC = FC<DataTableProps<any, any>>;
