import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = (() => {
  let prisma: PrismaClient | undefined;

  if (process.env.NODE_ENV !== "production") {
    if (!globalThis.hasOwnProperty('__prisma')) {
      globalThis.__prisma = new PrismaClient();
    }
    prisma = globalThis.__prisma;
  } else {
    prisma = new PrismaClient();
  }

  return prisma;
})();

export default prismaClientSingleton;
