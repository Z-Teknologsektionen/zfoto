import { Copy, Download, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { Button, buttonVariants } from "~/components/ui/button";
import { StandardTooltip } from "~/components/ui/tooltip";
import { createByline, getFullFilePath } from "~/utils/utils";

type ImagePopupHeaderProps = {
  filename: string;
  photographer: string;
  closePopup: () => void;
};

export const ImagePopupHeader: FC<ImagePopupHeaderProps> = ({
  filename,
  photographer,
  closePopup,
}) => {
  const { data: session } = useSession();

  const isAuthenticated = session && session.user && session.user.role;

  return (
    <header className="flex h-16 w-full justify-end gap-4 bg-white pr-2 pt-2 text-right md:pr-4 md:pt-4">
      <StandardTooltip
        trigger={
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
        content={<p>Kopiera byline</p>}
      />
      <StandardTooltip
        trigger={
          <a
            href={getFullFilePath(
              filename,
              isAuthenticated ? "full" : "lowres",
            )}
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
        content={<p>Ladda ner bild</p>}
      />
      <StandardTooltip
        trigger={
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
        content={<p>Stäng popup</p>}
      />
    </header>
  );
};
