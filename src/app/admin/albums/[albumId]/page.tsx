import { notFound } from "next/navigation";
import { DataTable } from "~/components/data-table/data-table";
import { BackButton } from "~/components/layout/back-button";
import { getAlbumAsAdmin } from "~/utils/fetchAdminData";
import { AlbumImageFilteringToolbar } from "./_components/album-image-filtering-toolbar";
import { EditAlbumForm } from "./_components/edit-form";
import { imageColumns } from "./_components/image-columns";

const AlbumAdminPage = async ({ params }: { params: { albumId: string } }) => {
  const album = await getAlbumAsAdmin(params.albumId).catch(() => notFound());

  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p className="text-sm">{album.id}</p>
        </div>
        <EditAlbumForm {...album} />
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
    </>
  );
};

export default AlbumAdminPage;
