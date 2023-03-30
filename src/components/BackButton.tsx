import { useRouter } from "next/router";
import type { FC } from "react";

const BackButton: FC<{ customOnClick?: () => void; text?: string }> = ({
  text,
  customOnClick,
}) => {
  const router = useRouter();

  return (
    <button
      className="-ml-2 w-fit underline-offset-2 hover:underline md:-ml-1"
      onClick={() => {
        if (customOnClick) {
          return customOnClick();
        }
        return router.back();
      }}
      type="button"
    >
      {text ?? "< Tillbaka"}
    </button>
  );
};

export default BackButton;
