import type { FC } from "react";

export const CloseImagePopup: FC<{ closePopup: () => void }> = ({
  closePopup,
}) => {
  return (
    <div className="absolute left-0 top-0 z-10 flex w-full justify-end py-2 px-4 md:p-6">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}

      <button
        className="cursor-pointer text-4xl font-semibold leading-none md:right-14"
        onClick={() => {
          closePopup();
        }}
        type="button"
      >
        x
      </button>
    </div>
  );
};
