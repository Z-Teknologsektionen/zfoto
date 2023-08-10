import Link from "next/link";
import SectionWrapper from "~/components/layout/SectionWrapper";

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
