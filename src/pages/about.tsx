import { PortableText } from "@portabletext/react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainWrapper from "../components/Wrapper";
import type { PagePayload } from "../utils/fetchDataFromSanity";
import { getPageBySlug } from "../utils/fetchDataFromSanity";

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

const AboutPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  page,
}) => {
  return (
    <MainWrapper>
      <div className="prose prose-sm mx-auto prose-h1:font-semibold">
        <PortableText value={page.content} />
      </div>
    </MainWrapper>
  );
};

export default AboutPage;
