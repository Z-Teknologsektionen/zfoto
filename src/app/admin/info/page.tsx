import type { FC } from "react";
import Link from "next/link";
import { Fragment } from "react";
import { SectionWrapper } from "~/components/layout/section-wrapper";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { adminCardsInfo } from "./data";

const InformationPage: FC = () => (
  <Fragment>
    <SectionWrapper>
      <div className="max-w-3xl space-y-2">
        <CardTitle className="text-3xl font-bold">Information</CardTitle>
        <CardDescription>
          På denna sidan kan du få mer information om vad som finns tillgängligt
          på hemsidan och vad du med admin behörighet kan göra.
        </CardDescription>
        <CardDescription>
          Hemsidan har byggts av Dennis Holmström Z22 och underhålls numera av
          Webbgruppen. Tanken är att bilderna från alla evenemang skall
          publiceras på hemsidan så att alla som var på evenemanget eller andra
          nyfikna ska kunna kolla på hemsidan och få en bild av evenemanget. OBS
          om Webbgruppen uppdaterar något så kanske inte all nedanstående
          information stämmer. Då får man be Webbgruppen att uppdatera
          nedanstående texter.
        </CardDescription>
        <CardDescription>
          För att göra ändringar som inte är listade nedan (som ex statiska
          texter eller logotyper) får man kontakta Webbgruppen men
          förhoppningsvis ändras inte dessa så ofta!
        </CardDescription>
      </div>
    </SectionWrapper>
    <SectionWrapper>
      <CardTitle>Admin sidor</CardTitle>
      {adminCardsInfo.map(({ title, canOpen, content, description }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{content}</CardContent>
          {canOpen && (
            <CardFooter>
              <Link
                className={buttonVariants({ variant: "link", size: "sm" })}
                href={title}
              >
                Besök sidan
              </Link>
            </CardFooter>
          )}
        </Card>
      ))}
    </SectionWrapper>
  </Fragment>
);

export default InformationPage;
