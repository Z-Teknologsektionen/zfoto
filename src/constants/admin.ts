import { Roles } from "@prisma/client";

export const adminLikeRoles = [
  Roles.ADMIN,
  Roles.PASSWORD_ADMIN,
] satisfies Roles[] as readonly Roles[];

export const MONTH_INDEX_NOVEMBER = 10;
