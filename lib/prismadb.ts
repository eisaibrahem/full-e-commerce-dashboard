import { PrismaClient } from "@prisma/client";

// إنشاء مثيل جديد لـ PrismaClient أو إعادة استخدام المثيل الحالي في بيئة التطوير
const prismaClientSingleton = (() => {
  let prisma: PrismaClient | undefined;

  // إذا كنا في بيئة التطوير، نستخدم المثيل المخزن في `global`
  if (process.env.NODE_ENV !== "production") {
    if (!globalThis.hasOwnProperty('__prisma')) {
      globalThis.__prisma = new PrismaClient();
    }
    prisma = globalThis.__prisma;
  } else {
    // في بيئة الإنتاج، ننشئ مثيل جديد في كل مرة
    prisma = new PrismaClient();
  }

  return prisma;
})();

export default prismaClientSingleton;
