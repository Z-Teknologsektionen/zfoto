import { DataTableToolBarProps } from "~/components/data-table/data-table";
import ToolbarTextInput from "~/components/data-table/data-table-toolbar/toolbar-text-input";
import ToolbarWrapper from "~/components/data-table/data-table-toolbar/toolbar-wrapper";

const AlbumImageFilteringToolbar = <TData,>({
  table,
}: DataTableToolBarProps<TData>) => {
  return (
    <ToolbarWrapper>
      <ToolbarTextInput
        column={table.getColumn("filename")}
        placeholder="Filtrera efter filnamn..."
      />
    </ToolbarWrapper>
  );
};

export default AlbumImageFilteringToolbar;
