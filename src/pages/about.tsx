import type { NextPage } from "next";
import MainWrapper from "../components/Wrapper";

const AboutPage: NextPage = () => {
  return (
    <MainWrapper>
      <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        <h1 className="pb-2 text-2xl font-semibold md:col-span-2">Om zFoto</h1>
        <div>
          <p>Kommer snart...</p>
        </div>
        {/*  <div className="relative h-52 w-full md:h-full">
        <Image
          src={`/zFoto2223.jpg`}
          fill
          alt={"Bild på sittande zFoto"}
          className="object-contain object-center"
        />
      </div> */}
      </section>
    </MainWrapper>
  );
};

export default AboutPage;
