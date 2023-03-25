import { DesktopIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page2",
  title: "Page",
  type: "document",
  icon: DesktopIcon,
  groups: [
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fieldsets: [
    {
      name: "content",
      title: "Content",
      options: {
        collapsed: false,
        collapsible: true,
      },
    },
    {
      name: "seo",
      title: "SEO",
      options: {
        collapsed: false,
        collapsible: true,
      },
    },
    {
      name: "content",
      title: "Content",
      options: {
        collapsed: false,
        collapsible: true,
      },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 50,
      },
    }),

    defineField({
      title: "Page without Sanity content",
      name: "noContent",
      description:
        "Used so that you can create links to pages without Sanity content",
      type: "boolean",
      initialValue: false,
      group: "settings",
    }),

    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [{ type: "textSection" }, { type: "heroSection" }],
      hidden: ({ parent }: { parent: { noContent: boolean } }) =>
        parent?.noContent,
      fieldset: "content",
    }),

    defineField({
      type: "boolean",
      title: "Hide Header",
      name: "noHeader",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      type: "boolean",
      title: "Hide Footer",
      name: "noFooter",
      initialValue: false,
      group: "settings",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      fieldset: "seo",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      fieldset: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        subtitle: "Page",
        title: selection.title as string,
      };
    },
  },
});
