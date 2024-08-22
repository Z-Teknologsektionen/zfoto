import type { Roles } from "@prisma/client";

export const formatRole = (role: Roles): string =>
  `${role.toUpperCase().at(0)}${role.toLowerCase().slice(1).replaceAll("_", " ")}`;
