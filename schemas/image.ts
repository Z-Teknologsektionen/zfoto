import { defineField, defineType } from "sanity";

export default defineType({
  name: "albumImages",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "filename",
      title: "Filename",
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: "boolean",
      name: "isVisible",
      title: "Visibility",
      initialValue: true,
    }),
    defineField({
      type: "boolean",
      name: "isCoverImage",
      title: "Cover Image?",
      initialValue: false,
    }),

    defineField({
      type: "string",
      name: "photographer",
      title: "Photographer",
      initialValue: "zFoto",
    }),

    defineField({
      type: "datetime",
      name: "date",
      title: "Event Date",
      hidden: true,
    }),
  ],
});
