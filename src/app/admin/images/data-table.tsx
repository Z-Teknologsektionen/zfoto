"use client";

import { DataTableFC } from "@/types/data-table";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTablePagination } from "~/components/data-table/data-table-pagination";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const DataTable: DataTableFC = ({ columns, data }) => {
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

  const photographers = [...new Set(data.map((a) => a.photographer))];

  return (
    <>
      <div className="flex items-center gap-2 py-4">
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn("filename")?.setFilterValue(event.target.value)
          }
          placeholder="Filtrera efter filnamn..."
          value={
            (table.getColumn("filename")?.getFilterValue() as string) ?? ""
          }
        />
        <Select
          onValueChange={(value) => {
            table
              .getColumn("photographer")
              ?.setFilterValue(value !== "all" ? value : "");
          }}
          defaultValue={""}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Välj fotograf" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-40">
              <SelectItem value="all">Alla</SelectItem>
              {photographers.map((phototograher) => (
                <SelectItem
                  key={phototograher.toLowerCase()}
                  value={phototograher}
                >
                  {phototograher}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
};
