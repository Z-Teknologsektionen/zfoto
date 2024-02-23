import { Metadata } from "next";
import { FC } from "react";
import SectionWrapper from "~/components/layout/SectionWrapper";
import SignInContent from "./sign-in-content";

export const metadata: Metadata = {
  title: "Logga in",
};

const LoginPage: FC = async () => {
  return (
    <div className="grid w-full flex-grow place-items-center">
      <SectionWrapper className="max-w-96">
        <h1 className="text-center text-3xl font-semibold leading-none tracking-tight">
          Logga in
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Du som aktiv i Z-teknologsektionen kan logga in med ditt google konto.
          Om du har fått ett eget inlogg kan du logga in med din epost.
        </p>
        <SignInContent />
      </SectionWrapper>
    </div>
  );
};

export default LoginPage;
