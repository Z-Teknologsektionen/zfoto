"use client";

import { Copy } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { StandardTooltip } from "~/components/ui/tooltip";
import { createByline } from "~/utils/utils";

const CopyBylineButton: FC<{ photographers: string[] }> = ({
  photographers,
}) => (
  <StandardTooltip
    Trigger={
      <Button
        variant={"ghost"}
        size={"icon"}
        className="h-6 w-6"
        onClick={() => {
          navigator.clipboard.writeText(createByline(photographers));
        }}
      >
        <Copy size={12} />
        <span className="sr-only">Kopiera byline</span>
      </Button>
    }
    Content={<p>Kopiera byline</p>}
  />
);

export default CopyBylineButton;
