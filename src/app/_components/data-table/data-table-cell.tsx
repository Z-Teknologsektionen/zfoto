import { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

export const DataTableCell: FC<
  PropsWithChildren<{
    className?: string;
    center?: boolean;
  }>
> = ({ children, className, center }) => {
  return (
    <div
      className={cn(center && "flex items-center justify-center", className)}
    >
      {children}
    </div>
  );
};
