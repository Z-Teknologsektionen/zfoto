import { PortableText } from "@portabletext/react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import type { PagePayload } from "~/utils/fetchDataFromSanity";
import { getPageBySlug } from "~/utils/fetchDataFromSanity";

const TermsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  page,
}) => {
  return (
    <MainLayout>
      <SectionWrapper>
        <div className="prose prose-sm prose-h1:font-semibold mx-auto">
          <PortableText value={page.content} />
        </div>
      </SectionWrapper>
    </MainLayout>
  );
};

export default TermsPage;

export const getStaticProps: GetStaticProps<{
  page: PagePayload;
}> = async () => {
  const page = await getPageBySlug("policy");

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
