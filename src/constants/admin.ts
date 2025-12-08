import { Roles } from "prisma/generated/enums";

export const adminLikeRoles = [
  Roles.ADMIN,
  Roles.PASSWORD_ADMIN,
] satisfies Roles[] as readonly Roles[];

export const MONTH_INDEX_NOVEMBER = 10;
