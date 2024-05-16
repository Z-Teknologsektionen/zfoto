"use client";

import { useTransition } from "react";
import { Button } from "~/components/ui/button";
import { setReceptionVisibilityClientAction } from "../_actions/setReceptionVisibilityClientAction";

export const AdminSidebarReceptionVisibilityButtons = () => {
  const [isUpdating, startTransition] = useTransition();

  return (
    <>
      <form
        action={() =>
          startTransition(() => {
            setReceptionVisibilityClientAction(false);
          })
        }
      >
        <Button
          className="mx-2"
          size="sm"
          variant="outline"
          disabled={isUpdating}
        >
          Dölj mottagningsalbum
        </Button>
      </form>
      <form
        action={() =>
          startTransition(() => {
            setReceptionVisibilityClientAction(true);
          })
        }
      >
        <Button
          className="mx-2"
          size="sm"
          variant="outline"
          disabled={isUpdating}
        >
          Visa mottagningsalbum
        </Button>
      </form>
    </>
  );
};
