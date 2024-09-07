import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
     log: [
          {
               emit: "event",
               level: "query"
          },
          {
               emit: "event",
               level: "error"
          },
          {
               emit: "event",
               level: "info"
          },
          {
               emit: "event",
               level: "warn"
          }
     ]
});

prismaClient.$on("error", function (e) {
     logger.error(e);
});

prismaClient.$on("warn", function (e) {
     logger.error(e);
});

prismaClient.$on("info", function (e) {
     logger.error(e);
});

prismaClient.$on("query", function (e) {
     logger.error(e);
});