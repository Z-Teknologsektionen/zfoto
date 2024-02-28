"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ComponentType, useState } from "react";
import { DataTablePagination } from "~/components/data-table/data-table-pagination";
import { Table } from "~/components/ui/table";
import DataTableBody from "./data-table-body";
import DataTableHeader from "./data-table-header";

export interface DataTableToolBarProps<TData> {
  table: TableType<TData>;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar?: ComponentType<DataTableToolBarProps<TData>>;
  usePagination?: boolean;
  noResultText?: string;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  toolbar: Toolbar,
  usePagination = false,
  noResultText,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      {Toolbar && <Toolbar table={table} />}
      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody
            table={table}
            columnLength={columns.length}
            noResultText={noResultText}
          />
        </Table>
      </div>
      {usePagination && <DataTablePagination table={table} />}
    </>
  );
};
