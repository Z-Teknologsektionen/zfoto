import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "~/components/back-button";
import { getImageAsAdmin } from "~/utils/fetchAdminData";
import { getFullFilePath } from "~/utils/utils";
import EditImageForm from "./edit-form";

const ImageAdminPage = async ({ params }: { params: { imageId: string } }) => {
  const image = await getImageAsAdmin(params.imageId).catch(() => notFound());
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <section className="container space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Redigera album</h1>
          <p className="text-sm">{image.id}</p>
          <p className="text-sm">{image.filename}</p>
        </div>
        <div>
          <EditImageForm {...image} />
        </div>
        <div className="">
          <Image
            src={getFullFilePath(image.filename, "lowres")}
            alt={`Filnamn: ${image.filename}, Fotograf: ${image.photographer}`}
            height={400}
            width={400}
            className="mx-auto block object-contain object-center"
          />
        </div>
      </section>
    </>
  );
};

export default ImageAdminPage;
