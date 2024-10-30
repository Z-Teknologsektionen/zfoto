import type { FC, HTMLAttributes } from "react";
import { cn } from "~/utils/utils";

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800",
      className,
    )}
    {...props}
  />
);

export { Skeleton };
