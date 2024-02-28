import { DataTableToolBarProps } from "~/components/data-table/data-table";
import ToolbarGroup from "~/components/data-table/data-table-toolbar/toolbar-group";
import ToolbarSelectDropdown from "~/components/data-table/data-table-toolbar/toolbar-select-dropdown";
import ToolbarTextInput from "~/components/data-table/data-table-toolbar/toolbar-text-input";
import ToolbarWrapper from "~/components/data-table/data-table-toolbar/toolbar-wrapper";
import { prisma } from "~/utils/db";

const ImagesFilteringToolbar = async <TData,>({
  table,
}: DataTableToolBarProps<TData>) => {
  const images = await prisma.image.findMany({
    select: { photographer: true },
  });
  const photographers = [...new Set(images.map((image) => image.photographer))];

  return (
    <ToolbarWrapper>
      <ToolbarGroup>
        <ToolbarTextInput
          column={table.getColumn("filename")}
          placeholder="Filtrera efter filnamn..."
        />
        <ToolbarSelectDropdown
          column={table.getColumn("photographer")}
          options={photographers.map((name) => ({ label: name, value: name }))}
          placeholder="Välj fotograf"
          size="xl"
        />
      </ToolbarGroup>
    </ToolbarWrapper>
  );
};

export default ImagesFilteringToolbar;
