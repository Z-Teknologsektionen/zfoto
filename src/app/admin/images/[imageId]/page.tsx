import Image from "next/image";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { Fragment } from "react";
import { BackButton } from "~/components/layout/back-button";
import { getImageAsAdmin } from "~/utils/fetchAdminData";
import { getFullFilePath } from "~/utils/utils";
import { EditImageForm } from "./_components/edit-form";

type ImageAdminPageProps = { params: { imageId: string } };

const ImageAdminPage: FC<ImageAdminPageProps> = async ({ params }) => {
  const image = await getImageAsAdmin(params.imageId).catch(() => notFound());
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ImageAdminPage;
