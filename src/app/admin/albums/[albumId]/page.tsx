import { notFound } from "next/navigation";
import type { FC } from "react";
import { Fragment } from "react";
import { DataTable } from "~/components/data-table/data-table";
import { BackButton } from "~/components/layout/back-button";
import { getAlbumAsAdmin } from "~/utils/fetchAdminData";
import { AlbumImageFilteringToolbar } from "./_components/album-image-filtering-toolbar";
import { EditAlbumForm } from "./_components/edit-form";
import { imageColumns } from "./_components/image-columns";

type AlbumAdminPageProps = { params: { albumId: string } };

const AlbumAdminPage: FC<AlbumAdminPageProps> = async ({ params }) => {
  const album = await getAlbumAsAdmin(params.albumId).catch(() => notFound());

  return (
    <Fragment>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p className="text-sm">{album.id}</p>
        </div>
        <EditAlbumForm
          id={album.id}
          title={album.title}
          date={album.date}
          isReception={album.isReception}
          isVisible={album.visible}
        />
      </section>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Bilder</h1>
        <DataTable
          toolbar={AlbumImageFilteringToolbar}
          columns={imageColumns}
          data={album.images}
          usePagination
        />
      </section>
    </Fragment>
  );
};

export default AlbumAdminPage;
