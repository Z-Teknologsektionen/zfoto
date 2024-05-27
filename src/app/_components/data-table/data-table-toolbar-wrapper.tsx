import { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

type ToolbarWrapperProps = { className?: string };

export const ToolbarWrapper: FC<PropsWithChildren<ToolbarWrapperProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between py-4", className)}>
      {children}
    </div>
  );
};