import { defineType } from "sanity";

export default defineType({
  name: "textSection",
  title: "Text Section",
  type: "object",
  fields: [],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        subtitle: "Text Section",
        title: selection.title as string,
      };
    },
  },
});
