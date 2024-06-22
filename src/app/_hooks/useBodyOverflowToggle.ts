"use client";

import { useEffect } from "react";

export const useBodyOverflowToggle = (hideOverflow: boolean): void => {
  useEffect(() => {
    if (hideOverflow) document.body.classList.add("overflow-hidden");

    return (): void => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [hideOverflow]);
};
