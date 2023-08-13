import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getAllAlbumsAsAdmin } from "~/utils/fetchAdminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const AlbumsAdminPage = async () => {
  const data = await getAllAlbumsAsAdmin();
  return (
    <>
      <div className="container">
        <Button variant="link" className="-ml-8" asChild>
          <Link href={"/admin"}>
            <ChevronLeft className="h-4 w-4" />
            <span>Tillbaka</span>
          </Link>
        </Button>
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Album</h1>
        <DataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default AlbumsAdminPage;
