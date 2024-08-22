import type { HTMLAttributes } from "react";
import { cn } from "~/utils/utils";

const Skeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800",
      className,
    )}
    {...props}
  />
);

export { Skeleton };
