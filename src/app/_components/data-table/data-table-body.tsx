import {
  Table,
  flexRender
} from "@tanstack/react-table";
import {
  TableBody,
  TableCell,
  TableRow
} from "~/components/ui/table";

const DataTableBody = <TData,>({table,columnLength,noResultText= "Inga resultat"}: {table: Table<TData>; columnLength: number, noResultText?: string;}) => {
  return (
    <TableBody>
      {table.getRowModel().rows.length === 0 ? (
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
            className="h-24 text-center"
            colSpan={columnLength}
          >
            {noResultText}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody