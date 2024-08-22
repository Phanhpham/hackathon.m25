import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const filePath = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products));
    return NextResponse.json({
      message: "Thêm mới thành công",
      data: products,
    });
  } catch (error) {
    return NextResponse.json({ message: "Thêm mới không thành công" });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(error);
  }
}