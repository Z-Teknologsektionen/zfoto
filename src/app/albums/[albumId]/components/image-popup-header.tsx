import { Download, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";

const ImagePopupHeader = ({
  filename,
  closePopup,
}: {
  filename: string;
  closePopup: () => void;
}) => {
  return (
    <header className="flex h-16 w-full justify-end gap-4 bg-white pr-2 pt-2 text-right md:pr-4 md:pt-4">
      <Button asChild type="button" size="icon" variant="outline">
        <a
          href={`/images/lowres/${filename}`}
          onClick={() => {
            toast.success("Laddar ner bild...\nGlöm inte följa vår policy!");
          }}
          type="button"
          download
        >
          <Download size={24} />
          <span className="sr-only">Ladda ner bild</span>
        </a>
      </Button>
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
    </header>
  );
};

export default ImagePopupHeader;
