import { PortableText } from "@portabletext/react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import type { PagePayload } from "~/utils/fetchDataFromSanity";
import { getPageBySlug } from "~/utils/fetchDataFromSanity";

const AboutPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  page,
}) => {
  return (
    <MainLayout>
      <SectionWrapper>
        <div className="prose prose-sm mx-auto prose-h1:font-semibold">
          <PortableText value={page.content} />
        </div>
      </SectionWrapper>
    </MainLayout>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<{
  page: PagePayload;
}> = async () => {
  const page = await getPageBySlug("about");

  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page,
    },
    revalidate: 300,
  };
};
