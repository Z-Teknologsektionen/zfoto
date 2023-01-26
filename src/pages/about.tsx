import type { NextPage } from "next";
import Link from "next/link";
import MainWrapper from "../components/Wrapper";

const AboutPage: NextPage = () => {
  return (
    <MainWrapper>
      <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        <h1 className="pb-2 text-2xl font-semibold md:col-span-2">Om zFoto</h1>
        <div>
          <p>Kommer snart...</p>
        </div>
        <div className="relative h-52 w-full md:h-full">
          {/*  <Image
          src={`/zFoto2223.jpg`}
          fill
          alt={"Bild på sittande zFoto"}
          className="object-contain object-center"
        /> */}
        </div>
        {/* Kommer automatiskt försvinna från hemsidan ett år efter att det lagts till enligt kraven från mera.se */}
        {new Date().getTime() < new Date(2024, 1, 20).getTime() && (
          <p>
            Vi köper våra märken från{" "}
            <Link
              className="underline underline-offset-2"
              href="https://www.mera.se"
              target="_blank"
            >
              mera.se
            </Link>
          </p>
        )}
      </section>
    </MainWrapper>
  );
};

export default AboutPage;
