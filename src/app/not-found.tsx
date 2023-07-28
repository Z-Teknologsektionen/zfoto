import type { NextPage } from "next";

const Custom404Page: NextPage = () => {
  return (
    <>
      <div className="grid h-full flex-grow place-items-center text-3xl">
        <h1>Sidan du letar efter finns inte!</h1>
      </div>
    </>
  );
};

export default Custom404Page;
