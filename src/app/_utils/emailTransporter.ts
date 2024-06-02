import { env } from "@/env.mjs";
import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport(
  {
    host: "send.one.com",
    port: 465,
    auth: {
      user: env.AUTH_USER,
      pass: env.AUTH_PASS,
    },
    from: env.AUTH_USER,
  },
  {
    from: env.AUTH_USER,
    sender: env.AUTH_USER,
  },
);
