import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "content",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Page",
        title,
      };
    },
  },
});
