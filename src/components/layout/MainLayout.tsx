import type { FC, PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

const MainLayout: FC<
  PropsWithChildren<{ hideFooter?: boolean; hideHeader?: boolean }>
> = ({ children, hideFooter = false, hideHeader = false }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {!hideHeader && <Header />}
        <main className="flex flex-grow flex-col">{children}</main>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;
