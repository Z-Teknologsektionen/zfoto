import Link from "next/link";

const ImagePopupFooter = ({
  photographer,
  filename,
  id,
}: {
  photographer: string;
  filename: string;
  id: string;
}) => {
  return (
    <footer className="flex w-full flex-col justify-center gap-x-4 gap-y-1 bg-white p-4 text-center text-xs font-medium md:flex-row lg:text-lg">
      <p>Fotograf: {photographer}</p>
      <p>Filnamn: {filename}</p>
      <Link className="cursor-pointer underline" href={`/image/${id}`}>
        Permanent länk
      </Link>
    </footer>
  );
};

export default ImagePopupFooter;
