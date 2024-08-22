"use server";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { Roles } from "@prisma/client";
import { db } from "~/utils/db";

export const getUserByEmailForSession = async (email: string) =>
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

export const getUserByEmailWithPassword = async (email: string) =>
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

export const getAllUsersAsAdmin = async () =>
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

export const updateUserRoleById = async (userId: string, role: Roles) =>
  db.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });
