import type { FC, PropsWithChildren } from "react";

const SectionWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 py-8 md:px-6 xl:px-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
