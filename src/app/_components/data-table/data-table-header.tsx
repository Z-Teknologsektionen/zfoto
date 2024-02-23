import { Table, flexRender } from '@tanstack/react-table';
import React from 'react';
import { TableHead, TableHeader, TableRow } from '../ui/table';

const DataTableHeader = <TData,>({table}:{table: Table<TData>}): React.JSX.Element => {
  return (
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
  )
}

export default DataTableHeader