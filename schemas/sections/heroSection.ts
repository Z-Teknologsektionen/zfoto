import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
    }),
    defineField({
      type: "string",
      name: "subtitle",
      title: "Subtitle",
    }),
    defineField({
      title: "Text Position",
      name: "country",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Bottom", value: "bottom" },
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "dropdown",
      },
      initialValue: "top",
    }),
    defineField({
      type: "image",
      name: "image",
      title: "Image",
    }),
    defineField({
      type: "boolean",
      name: "hasMobileImage",
      title: "Separate mobile image",
      initialValue: false,
    }),
    defineField({
      type: "image",
      name: "mobileImage",
      title: "Mobile Image",
      hidden: ({ parent }: { parent: { hasMobileImage: boolean } }) =>
        !parent?.hasMobileImage,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: { title: string }) {
      return {
        subtitle: "Text Section",
        title,
      };
    },
  },
});
