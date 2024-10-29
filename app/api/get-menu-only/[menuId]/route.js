import connectMongoDB from "@/libs/mongodb";
import Menu from "@/models/menu";
import User from "@/models/user";
import MenuItem from "@/models/menuItem";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { menuId } = params;
  try {
    await connectMongoDB();
    const menu = await Menu.findOne({ uniqueMenuId: menuId });
    return NextResponse.json({ menu }, { status: 200 });
  } catch (error) {
    console.log("Error API:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
