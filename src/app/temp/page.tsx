import { createAlbumAPISchema } from "@/schemas/album";

const page = () => {
  const json = {
    title: "",
    date: new Date(),
    images: [
      {
        filename: "abc",
        date: new Date(),
      },
      {
        filename: "",
        date: new Date(),
      },
    ],
  };
  const parse = createAlbumAPISchema.safeParse(json);
  const formatedError = parse.error?.issues
    .map(({ message, path }) => `${path.join(".")}: ${message}`)
    .join("\n");
  return (
    <div>
      <pre>{JSON.stringify(parse, null, 2)}</pre>
      <pre>{formatedError}</pre>
    </div>
  );
};

export default page;
