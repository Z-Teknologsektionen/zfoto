import type { NextPage } from "next";
import Link from "next/link";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";

const ContactPage: NextPage = () => {
  return (
    <MainLayout>
      <SectionWrapper className="p-5">
        <h1>Contact page</h1>
        <p>Kommer snart...</p>
        <p>
          Sålänge kan du skicka ett mail till oss
          <Link
            className="underline underline-offset-2"
            href="mailto:zfoto@ztek.se"
          >
            {` här `}
          </Link>
        </p>
      </SectionWrapper>
    </MainLayout>
  );
};

export default ContactPage;
