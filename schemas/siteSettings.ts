import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      title: "Base Title",
      name: "title",
      type: "string",
    }),

    defineField({
      title: "Meta Description",
      name: "description",
      type: "text",
    }),

    defineField({
      type: "image",
      name: "image",
      title: "SEO image",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
