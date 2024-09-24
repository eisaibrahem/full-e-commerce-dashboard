import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// تحديث بيانات المتجر باستخدام PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // التحقق من المصادقة
    const { userId } = await auth();

    // قراءة محتوى الطلب
    const { name } = await req.json();

    // التحقق من المصادقة ووجود البيانات المطلوبة
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // تحديث المتجر في قاعدة البيانات
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// حذف المتجر باستخدام DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // التحقق من المصادقة
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // حذف المتجر في قاعدة البيانات
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// جلب المتاجر باستخدام GET
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: Request, res) {
  if (req.method === 'GET') {
    try {
      // جلب جميع المتاجر من قاعدة البيانات
      const stores = await prisma.store.findMany();
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stores' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
