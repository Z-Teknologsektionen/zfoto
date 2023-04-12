import type { NextPage } from "next";
import MainLayout from "~/components/layout/MainLayout";

const Custom404Page: NextPage = () => {
  return (
    <MainLayout>
      <div className="grid h-full flex-grow place-items-center text-3xl">
        <h1>Sidan du letar efter finns inte!</h1>
      </div>
    </MainLayout>
  );
};

export default Custom404Page;
