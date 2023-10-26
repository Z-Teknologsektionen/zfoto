import type { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

const SectionWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6 xl:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
