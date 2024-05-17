import { Metadata } from "next";
import { FC, Suspense } from "react";
import { SectionWrapper } from "~/components/layout/section-wrapper";
import { SignInContent } from "./_components/sign-in-content";

export const metadata: Metadata = {
  title: "Logga in",
};

const LoginPage: FC = () => {
  return (
    <SectionWrapper className="flex w-full max-w-96 flex-grow flex-col justify-center gap-4 space-y-0">
      <h1 className="text-center text-3xl font-semibold leading-none tracking-tight">
        Logga in
      </h1>
      <p className="text-xs text-neutral-500">
        Du som aktiv i Z-Teknologsektionen kan logga in med ditt Google-konto.
        Om du har fått ett eget inlogg kan du logga in med din epost.
      </p>
      <Suspense>
        <SignInContent />
      </Suspense>
    </SectionWrapper>
  );
};

export default LoginPage;
