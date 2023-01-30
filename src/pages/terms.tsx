import type { NextPage } from "next";
import MainWrapper from "../components/Wrapper";

const TermsPage: NextPage = () => {
  return (
    <MainWrapper>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <h1 className="text-2xl font-semibold">Bildpolicy</h1>
        <p>
          Om nedanstående villkor inte uppfylls förbehåller vi oss rätten att
          kräva att bilderna tas ned och utkräva ersättning.
        </p>
        <p>
          Obehörig användning av bilder från denna webbplats är förbjuden. För
          användning av bilder inom icke kommersiella syften lämnar vi ut
          vattenmärkta bilder; kontakta oss då med filnamn för att få tillgång
          till dessa. Vid användning av dessa bilder gäller följande:
        </p>
        <ul className="ml-4 flex list-disc flex-col gap-2">
          <li>
            Bilderna får ej beskäras på ett sådant sätt att det ändrar bildens
            fokus eller karaktär, och inte heller på ett sådan sätt att
            vattenmärket inte är synligt.
          </li>
          <li>
            Bilderna får ej manipuleras på ett sådant sätt att färger förvrängs,
            t.ex. genom användningen av filter.
          </li>
          <li>Bilderna får ej distribueras till tredje part.</li>
          <li>
            Vid publicering av bilderna ska följande byline användas “Foto: [för
            och efternamn]/zFoto”.
          </li>
        </ul>
        <p>
          För användning av bilder i kommersiellt syfte eller till andra ändamål
          var god kontakta oss för mer information.
        </p>
        <p>
          Om du är osäker på om din användning bryter mot dessa villkor
          rekommenderar vi att du frågar oss vad som gäller i just ditt fall.
        </p>
      </div>
    </MainWrapper>
  );
};

export default TermsPage;

/* 
Om nedanstående villkor inte uppfylls förbehåller vi oss rätten att kräva att bilderna tas ned och utkräva ersättning.

Obehörig användning av bilder från denna webbplats är förbjuden. För användning av bilder inom icke kommersiella syften lämnar vi ut vattenmärkta bilder; kontakta oss då med filnamn för att få tillgång till dessa. Vid användning av dessa bilder gäller följande:

Bilderna får ej beskäras på ett sådant sätt att det ändrar bildens fokus eller karaktär, och inte heller på ett sådan sätt att vattenmärket inte är synligt.
Bilderna får ej manipuleras på ett sådant sätt att färger förvrängs, t.ex. genom användningen av filter.
Bilderna får ej distribueras till tredje part.
Vid publicering av bilderna ska följande byline användas “Foto: [för och efternamn]/zFoto”.

För användning av bilder i kommersiellt syfte eller till andra ändamål var god kontakta oss för mer information.

Om du är osäker på om din användning bryter mot dessa villkor rekommenderar vi att du frågar oss vad som gäller i just ditt fall.
 */
