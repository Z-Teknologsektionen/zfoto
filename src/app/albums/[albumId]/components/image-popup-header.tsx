import { Copy, Download, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button, buttonVariants } from "~/components/ui/button";
import { StandardTooltip } from "~/components/ui/tooltip";
import { createByline } from "~/utils/utils";

const ImagePopupHeader = ({
  filename,
  photographer,
  closePopup,
}: {
  filename: string;
  photographer: string;
  closePopup: () => void;
}) => {
  return (
    <header className="flex h-16 w-full justify-end gap-4 bg-white pr-2 pt-2 text-right md:pr-4 md:pt-4">
      <StandardTooltip
        Trigger={
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(createByline(photographer));
            }}
          >
            <Copy size={20} />
            <span className="sr-only">Kopiera byline</span>
          </Button>
        }
        Content={<p>Kopiera byline</p>}
      />
      <StandardTooltip
        Trigger={
          <a
            href={`/images/lowres/${filename}`}
            onClick={() => {
              toast.success("Laddar ner bild...\nGlöm inte följa vår policy!");
            }}
            className={buttonVariants({ size: "icon", variant: "outline" })}
            type="button"
            download
          >
            <Download size={24} />
            <span className="sr-only">Ladda ner bild</span>
          </a>
        }
        Content={<p>Ladda ner bild</p>}
      />
      <StandardTooltip
        Trigger={
          <Button
            onClick={() => {
              closePopup();
            }}
            type="button"
            variant="default"
            size="icon"
          >
            <X size={24} />
            <span className="sr-only">Stäng popup</span>
          </Button>
        }
        Content={<p>Stäng popup</p>}
      />
    </header>
  );
};

export default ImagePopupHeader;
