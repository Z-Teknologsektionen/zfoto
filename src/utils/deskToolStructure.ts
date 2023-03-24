import { CogIcon } from "@sanity/icons";
import { deskTool } from "sanity/desk";

const singleTons = [
  { id: "siteSettings", title: "Settings", icon: CogIcon },
  /* { id: "page", title: "page" }, */
];

const excudedIds = [...singleTons.map((s) => s.id)];

export const deskToolStructure = deskTool({
  structure: (S) =>
    S.list()
      .title("Base")
      .items([
        ...S.documentTypeListItems().filter(
          (item) => !excudedIds.includes(item.getId() ?? "")
        ),
        S.divider(),
        ...singleTons.map((s) =>
          S.listItem()
            .title(s.title)
            .icon(s.icon)
            .child(S.document().schemaType(s.id).documentId(s.id))
        ),
      ]),
});
