import BackButton from "~/components/back-button";
import { getAllUsersAsAdmin } from "~/utils/fetchAdminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const UsersAdminPage = async () => {
  const data = await getAllUsersAsAdmin();
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <h1 className="text-xl font-semibold">Användare</h1>
        <DataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default UsersAdminPage;
