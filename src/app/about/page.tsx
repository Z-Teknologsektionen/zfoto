import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { getPageBySlug } from "~/utils/fetchDataFromSanity";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Om",
};

const AboutPage = async () => {
  const page = await getPageBySlug("about").catch(() => notFound());

  if (!page) notFound();

  return (
    <>
      <SectionWrapper>
        <div className="prose prose-sm mx-auto prose-h1:font-semibold">
          <PortableText value={page.content} />
        </div>
      </SectionWrapper>
    </>
  );
};

export default AboutPage;
