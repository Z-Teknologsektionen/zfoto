import type React from "react";
import type { FC } from "react";

const MainWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className="px-8 py-6 md:px-5 md:py-4">{children}</section>;
};

export default MainWrapper;
