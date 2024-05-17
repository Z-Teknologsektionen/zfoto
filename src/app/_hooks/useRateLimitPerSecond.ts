"use client";

import { useCallback, useRef } from "react";

export const useRateLimit = (intervalMs: number) => {
  const lastCalledRef = useRef(0);

  const rateLimitedFunction = useCallback(
    (func: () => void) => {
      const now = Date.now();
      const elapsed = now - lastCalledRef.current;
      const leftToWait = intervalMs - elapsed;

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
    [intervalMs],
  );

  const reset = useCallback(() => {
    lastCalledRef.current = 0;
  }, []);

  return { rateLimitedFunction, reset };
};
