import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "album",
  title: "Album",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "text",
      name: "description",
      title: "Description",
    }),

    defineField({
      type: "datetime",
      name: "date",
      title: "Event Date",
    }),
    defineField({
      type: "boolean",
      name: "isVisible",
      title: "Visibility",
      initialValue: true,
    }),

    defineField({
      type: "array",
      name: "images",
      title: "Images",
      of: [{ type: "albumImages" }],
    }),
  ],
});
