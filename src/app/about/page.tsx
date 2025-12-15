import type { Metadata } from "next";
import type { FC } from "react";
import { SectionWrapper } from "~/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Om",
};

const AboutPage: FC = async () => {
  return (
    <SectionWrapper>
      <div className="prose prose-sm mx-auto prose-h1:font-semibold">
        <h1>Om oss</h1>
        <p>zFoto är Z-Teknologsektionens fotoutskott, precis som namnet antyder så är vi ansvariga för att fotografera och dokumentera sektionens arrangemang.</p>
        <p>Vi består av fyra ledamöter, Produzent (Sammankallande), Regizzör, Pazzare och Putzare.</p>
        <p>Vill du komma i kontakt med oss? Skicka då ett <a href="/contact">mail</a> eller hugg tag i oss vid lämpligt tillfälle!</p>
      </div>
    </SectionWrapper>
  );
};

export default AboutPage;
