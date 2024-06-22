import type { FC } from "react";
import { Fragment } from "react";
import { DataTable } from "~/components/data-table/data-table";
import { BackButton } from "~/components/layout/back-button";
import { getAllAlbumsAsAdmin } from "~/utils/fetchAdminData";
import { albumColumns } from "./_components/album-columns";
import { AlbumsFilteringToolbar } from "./_components/albums-filtering-toolbar";

const AlbumsAdminPage: FC = async () => {
  const data = await getAllAlbumsAsAdmin();
  return (
    <Fragment>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Album</h1>
        <DataTable
          toolbar={AlbumsFilteringToolbar}
          columns={albumColumns}
          data={data}
          usePagination
        />
      </section>
    </Fragment>
  );
};

export default AlbumsAdminPage;
