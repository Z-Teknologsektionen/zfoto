import type { FC, PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { LoadingSection } from "./Loader";

const MainLayout: FC<
  PropsWithChildren<{
    hideFooter?: boolean;
    hideHeader?: boolean;
    isLoading?: boolean;
  }>
> = ({
  children,
  hideFooter = false,
  hideHeader = false,
  isLoading = false,
}) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {!hideHeader && <Header />}
        <main className="flex flex-grow flex-col">
          {children}
          {isLoading && <LoadingSection />}
        </main>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;
