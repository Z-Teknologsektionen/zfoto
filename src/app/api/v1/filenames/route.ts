import { getAllImageFilenames } from "@/server/data-access/images";

export const GET = async (_request: Request): Promise<Response> => {
  try {
    const filenames = await getAllImageFilenames();

    return Response.json(filenames, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Unknown error" }, { status: 500 });
  }
};
