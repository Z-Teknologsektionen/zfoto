"use server";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  CACHE_TAGS,
  dbCache,
  getGlobalTag,
  revalidateDbCache,
} from "@/lib/cache";
import type { Roles } from "@prisma/client";
import { db } from "~/utils/db";

const getUserByEmailForSessionInternal = async (email: string) =>
  db.user.findUnique({
    where: {
      email,
    },
    select: {
      role: true,
      email: true,
      image: true,
      name: true,
      id: true,
    },
  });

const getUserByEmailWithPasswordInternal = async (email: string) =>
  db.user.findUnique({
    where: {
      email,
      password: {
        not: {
          equals: null,
        },
      },
    },
  });

const getAllUsersAsAdminInternal = async () =>
  db.user.findMany({
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      id: true,
    },
    orderBy: [{ name: "asc" }],
  });

export const updateUserRoleById = async (userId: string, role: Roles) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });

  revalidateDbCache({ tag: CACHE_TAGS.users, id: userId });
};
export const getUserByEmailForSession = async (email: string) =>
  dbCache(getUserByEmailForSessionInternal, {
    tags: [getGlobalTag(CACHE_TAGS.users)],
  })(email);

export const getUserByEmailWithPassword = async (email: string) =>
  dbCache(getUserByEmailWithPasswordInternal, {
    tags: [getGlobalTag(CACHE_TAGS.users)],
  })(email);

export const getAllUsersAsAdmin = async () =>
  dbCache(getAllUsersAsAdminInternal, {
    tags: [getGlobalTag(CACHE_TAGS.users)],
  })();
