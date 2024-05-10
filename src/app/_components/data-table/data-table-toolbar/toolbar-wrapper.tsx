import { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

const ToolbarWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between py-4", className)}>
      {children}
    </div>
  );
};

export default ToolbarWrapper;
