import type { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

type SectionWrapperProps = { className?: string };

export const SectionWrapper: FC<PropsWithChildren<SectionWrapperProps>> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6 xl:px-0",
        className,
      )}
    >
      {children}
    </section>
  );
};
