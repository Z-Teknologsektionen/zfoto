import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "~/components/ui/button";
import { getAlbumAsAdmin } from "~/utils/fetchAdminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import EditAlbumForm from "./edit-form";

const AlbumAdminPage = async ({ params }: { params: { albumId: string } }) => {
  const album = await getAlbumAsAdmin(params.albumId).catch(() => notFound());
  return (
    <>
      <div className="container">
        <Button variant="link" className="-ml-8" asChild>
          <Link href={"/admin/albums"}>
            <ChevronLeft className="h-4 w-4" />
            <span>Tillbaka</span>
          </Link>
        </Button>
      </div>
      <section className="container space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p className="text-sm">{album.id}</p>
        </div>
        <div>
          <EditAlbumForm {...album} />
        </div>
      </section>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Bilder</h1>
        <DataTable columns={columns} data={album.images} />
      </section>
    </>
  );
};

export default AlbumAdminPage;
