import { notFound } from "next/navigation";
import BackButton from "~/components/back-button";
import { DataTable } from "~/components/data-table/data-table";
import { getAlbumAsAdmin } from "~/utils/fetchAdminData";
import AlbumImageFilteringToolbar from "./album-image-filtering-toolbar";
import { columns } from "./columns";
import EditAlbumForm from "./edit-form";

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
          columns={columns}
          data={album.images}
          usePagination
        />
      </section>
    </>
  );
};

export default AlbumAdminPage;
