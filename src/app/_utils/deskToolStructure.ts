import type { ComponentType } from "react";
import { deskTool } from "sanity/desk";

const singleTons: {
  Icon: ComponentType;
  id: string;
  title: string;
}[] = [];

const excudedIds = [...singleTons.map((s) => s.id)];

export const deskToolStructure = deskTool({
  structure: (S) =>
    S.list()
      .title("Base")
      .items([
        ...S.documentTypeListItems().filter(
          (item) => !excudedIds.includes(item.getId() ?? ""),
        ),
        S.divider(),
        ...singleTons.map((s) =>
          S.listItem()
            .title(s.title)
            .icon(s.Icon)
            .child(S.document().schemaType(s.id).documentId(s.id)),
        ),
      ]),
});
