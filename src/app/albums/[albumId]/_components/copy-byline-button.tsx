"use client";

import { Copy } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { StandardTooltip } from "~/components/ui/tooltip";
import { createByline } from "~/utils/utils";

type CopyBylineButtonProps = { photographers: string[] };

export const CopyBylineButton: FC<CopyBylineButtonProps> = ({
  photographers,
}) => (
  <StandardTooltip
    trigger={
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => {
          navigator.clipboard.writeText(createByline(photographers));
        }}
      >
        <Copy size={12} />
        <span className="sr-only">Kopiera byline</span>
      </Button>
    }
    content={<p>Kopiera byline</p>}
  />
);
