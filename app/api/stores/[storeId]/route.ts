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
export async function GET() {
  try {
    // جلب جميع المتاجر من قاعدة البيانات
    const stores = await prismadb.store.findMany();
    return NextResponse.json(stores);
  } catch (error) {
    console.log("[STORE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
