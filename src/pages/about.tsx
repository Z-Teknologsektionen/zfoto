import type { NextPage } from "next";
import Image from "next/image";

const AboutPage: NextPage = () => {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 py-10 px-5 md:grid-cols-2">
      <h1 className="pb-2 text-3xl font-semibold md:col-span-2">Om zFoto</h1>
      <div>
        <p>Kommer snart...</p>
      </div>
      <div className="relative h-52 w-full md:h-full">
        <Image
          src={`/zFoto2223.jpg`}
          fill
          alt={"Bild på sittande zFoto"}
          className="object-contain object-center"
        />
      </div>
    </section>
  );
};

export default AboutPage;
