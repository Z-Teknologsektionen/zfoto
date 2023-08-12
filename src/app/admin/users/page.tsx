import { Prisma } from "@prisma/client";
import BackButton from "~/components/back-button";
import { prisma } from "~/utils/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getUsers = () => {
  return prisma.user.findMany({
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      id: true,
    },
    orderBy: [{ name: "asc" }],
  });
};

export type User = Prisma.PromiseReturnType<typeof getUsers>[0];

const UsersAdminPage = async () => {
  const data = await getUsers();
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
