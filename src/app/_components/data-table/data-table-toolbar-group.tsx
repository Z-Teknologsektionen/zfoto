import { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

type ToolbarGroupProps = { className?: string };

export const ToolbarGroup: FC<PropsWithChildren<ToolbarGroupProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {children}
    </div>
  );
};