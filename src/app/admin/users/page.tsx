import { DataTable } from "~/components/data-table/data-table";
import { BackButton } from "~/components/layout/back-button";
import { getAllUsersAsAdmin } from "~/utils/fetchAdminData";
import { userColumns } from "./_components/user-columns";

const UsersAdminPage = async () => {
  const data = await getAllUsersAsAdmin();
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Användare</h1>
        <DataTable columns={userColumns} data={data} usePagination />
      </section>
    </>
  );
};

export default UsersAdminPage;
