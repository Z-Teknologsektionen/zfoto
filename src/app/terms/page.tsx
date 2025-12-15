import type { Metadata } from "next";
import type { FC } from "react";
import { SectionWrapper } from "~/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Villkor",
};

const TermsPage: FC = async () => {
  return (
    <SectionWrapper>
      <div className="prose prose-sm mx-auto prose-h1:font-semibold">
        <h1>Bildpolicy</h1>
        <p>Om nedanstående villkor inte uppfylls förbehåller vi oss rätten att kräva att bilderna tas ned och utkräva ersättning.</p>
        <p>Obehörig användning av bilder från denna webbplats är förbjuden. För användning av bilder inom icke kommersiella syften lämnar vi ut bilder i full upplösning; kontakta oss då med filnamn för att få tillgång till dessa. Vid användning av dessa bilder gäller följande:</p>
        <ul>
          <li>Bilderna får ej beskäras på ett sådant sätt att det ändrar bildens fokus eller karaktär.</li>
          <li>Bilderna får ej manipuleras på ett sådant sätt att färger förvrängs, t.ex. genom användningen av filter.</li>
          <li>Bilderna får ej distribueras till tredje part.</li>
          <li>Vid publicering av bilderna ska följande byline användas “Foto: för och efternamn/zFoto” (Vid flera fotografer använd kommatecken mellan namnen).</li>
        </ul>
        <p>För användning av bilder i kommersiellt syfte eller till andra ändamål var god kontakta oss för mer information.</p>
        <p>Om du är osäker på om din användning bryter mot dessa villkor rekommenderar vi att du frågar oss vad som gäller i just ditt fall.</p>
      </div>
    </SectionWrapper>
  );
};

export default TermsPage;
