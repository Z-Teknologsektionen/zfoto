import { Metadata } from "next";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ContactForm from "./contact-form";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kontakt",
};

const ContactPage = () => {
  return (
    <>
      <SectionWrapper>
        <div className="mx-auto flex w-fit flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 px-4 py-8 shadow">
          <h1 className="text-center text-2xl font-medium">Kontakt</h1>
          <ContactForm />
        </div>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
