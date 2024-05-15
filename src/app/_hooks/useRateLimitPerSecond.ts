"use client";

import { useCallback, useRef } from "react";

export const useRateLimitPerSecond = (callsPerSecond: number) => {
  const lastCalledRef = useRef(0);
  const interval = 1000 / callsPerSecond;

  const rateLimitedFunction = useCallback(
    (func: () => void) => {
      const now = Date.now();
      const elapsed = now - lastCalledRef.current;
      const leftToWait = interval - elapsed;

      if (leftToWait > 0) {
        setTimeout(() => {
          lastCalledRef.current = Date.now();
          func();
        }, leftToWait);
      } else {
        lastCalledRef.current = now;
        func();
      }
    },
    [interval],
  );

  const reset = useCallback(() => {
    lastCalledRef.current = 0;
  }, []);

  return { rateLimitedFunction, reset };
};
