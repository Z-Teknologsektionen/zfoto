"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "~/utils/utils";

const Avatar = ({ ref, className, ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & { ref?: React.RefObject<ElementRef<typeof AvatarPrimitive.Root> | null> }) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = ({ ref, className, ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { ref?: React.RefObject<ElementRef<typeof AvatarPrimitive.Image> | null> }) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = ({ ref, className, ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { ref?: React.RefObject<ElementRef<typeof AvatarPrimitive.Fallback> | null> }) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800",
      className,
    )}
    {...props}
  />
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
