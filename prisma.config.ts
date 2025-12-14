//dotenv must be the first thing to be imported
import "dotenv/config";

// eslint-disable-next-line perfectionist/sort-imports
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
