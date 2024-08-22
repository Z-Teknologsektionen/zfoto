"use client";

import { useEffect } from "react";

export const useWindowKeydownListener = (
  keyDownFunktion: (_event: KeyboardEvent) => void,
): void => {
  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("keydown", keyDownFunktion);

    return () => {
      window.removeEventListener("keydown", keyDownFunktion);
    };
  }, [keyDownFunktion]);
};
