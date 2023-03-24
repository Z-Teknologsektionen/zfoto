import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      description: "Name that will be displayed with the link",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      type: "object",
      title: "Link",
      validation: (rule) => rule.required(),
      fields: [
        {
          name: "external",
          type: "url",
          title: "URL",
          hidden: ({
            parent,
            value,
          }: {
            parent: { external: boolean; internal: boolean };
            value: string;
          }) => !value && !!parent?.internal,
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https", "mailto", "tel"],
            }),
        },
        {
          name: "internal",
          type: "reference",
          to: [{ type: "page" }, { type: "page2" }],
          hidden: ({
            parent,
            value,
          }: {
            parent: { external: boolean; internal: boolean };
            value: string;
          }) => !value && !!parent?.external,
        },
      ],
    }),
    defineField({
      type: "string",
      name: "ariaLabel",
      title: "Aria Label",
      description: "Description of what the link is",
    }),
    defineField({
      title: "Open in new tab?",
      name: "blank",
      description: "Read https://css-tricks.com/use-target_blank/",
      type: "boolean",
      hidden: ({
        parent,
      }: {
        parent: { link: { external: boolean; internal: boolean } };
      }) => !parent?.link?.external,
      initialValue: false,
    }),
  ],
});
