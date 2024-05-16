import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/utils";

type SignInErrorCardProps = {
  text: string;
  className?: string;
};

export const SignInErrorCard = ({ text, className }: SignInErrorCardProps) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "grid place-items-center rounded text-red-500 shadow-sm drop-shadow-sm",
        className,
      )}
    >
      <p>{text}</p>
    </div>
  );
};
