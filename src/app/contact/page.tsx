import { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "~/components/layout/SectionWrapper";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kontakt",
};

const ContactPage = () => {
  return (
    <>
      <SectionWrapper>
        <h1>Kommer snart...</h1>
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
    </>
  );
};

export default ContactPage;
