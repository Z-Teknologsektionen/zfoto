import { env } from "@/env/server.mjs";
import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 465,
  auth: {
    user: env.AUTH_USER,
    pass: env.AUTH_PASS,
  },
  from: env.AUTH_USER,
});
