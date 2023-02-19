import { PortableText } from "@portabletext/react";
import type { GetStaticProps, NextPage } from "next";
import MainWrapper from "../components/Wrapper";
import type { PagePayload } from "../utils/fetchDataFromSanity";
import { getPageBySlug } from "../utils/fetchDataFromSanity";

const TermsPage: NextPage<{ page: PagePayload }> = ({ page }) => {
  return (
    <MainWrapper>
      <div className="prose prose-sm mx-auto max-w-3xl prose-h1:text-2xl prose-h1:font-semibold">
        <PortableText value={page.content} />
      </div>
    </MainWrapper>
  );
};

export default TermsPage;

export const getStaticProps: GetStaticProps = async () => {
  const page = await getPageBySlug("policy");

  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page,
      revalidate: 300,
    },
  };
};
