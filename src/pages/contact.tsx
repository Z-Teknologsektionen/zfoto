import type { NextPage } from "next";

const ContactPage: NextPage = () => {
  return (
    <section className="p-5">
      <h1>Contact page</h1>
      <p>Kommer snart...</p>
      <p>
        Sålänge kan du skicka ett mail till oss{" "}
        <a href="mailto:zfoto@ztek.se" className="underline underline-offset-2">
          här
        </a>
      </p>
    </section>
  );
};

export default ContactPage;
