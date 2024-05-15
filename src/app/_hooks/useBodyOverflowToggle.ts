"use client";

import { useEffect } from "react";

export const useBodyOverflowToggle = (hideOverflow: boolean) => {
  useEffect(() => {
    if (hideOverflow) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [hideOverflow]);
};
