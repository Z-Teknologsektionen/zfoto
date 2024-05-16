import { Metadata } from "next";
import { SectionWrapper } from "~/components/layout/section-wrapper";
import { ContactForm } from "./_components/contact-form";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kontakt",
};

const ContactPage = () => {
  return (
    <>
      <SectionWrapper>
        <div className="mx-auto flex max-w-xl flex-col gap-4 rounded-lg border border-gray-400 bg-gray-100 p-8 shadow">
          <h1 className="text-2xl font-medium">Kontakt</h1>
          <ContactForm />
        </div>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
