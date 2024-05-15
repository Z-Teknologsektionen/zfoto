"use client";

import { useEffect } from "react";

export const useWindowKeydownListener = (
  keyDownFunktion: (_event: KeyboardEvent) => void,
) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", keyDownFunktion);

    return () => {
      window.removeEventListener("keydown", keyDownFunktion);
    };
  }, [keyDownFunktion]);
};
