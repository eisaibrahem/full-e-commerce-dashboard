import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // التحقق من وجود storeId في المعلمات
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

   

    // استرجاع المتجر بناءً على storeId
    const store = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
  
      }
    })

    // التحقق مما إذا تم العثور على المتجر
    if (!store) {
      return new NextResponse("Store not found or unauthorized", { status: 404 })
    }

    // إرجاع بيانات المتجر
    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_GET]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
