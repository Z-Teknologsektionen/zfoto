import { FC, PropsWithChildren } from "react";
import { cn } from "~/utils/utils";

const ToolbarGroup: FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {children}
    </div>
  );
};

export default ToolbarGroup;
