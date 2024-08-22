import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(
  request: Request,
  params: { params: { id: string } }
) {
  try {
    const pathname = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(pathname, "utf8"));
    const findIndex = products.findIndex(
      (p: any) => p.id === +params.params.id
    );
    if (findIndex !== -1) {
      const newProducts = products.filter(
        (product: any) => product.id !== +params.params.id
      );
      fs.writeFileSync(pathname, JSON.stringify(newProducts), "utf8");
      return NextResponse.json({
        message: "Xóa thành công",
        data: newProducts,
      });
    } else {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function PUT(
  request: Request,
  params: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const pathname = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(pathname, "utf8"));
    const findIndex = products.findIndex(
      (p: any) => p.id === +params.params.id
    );
    if (findIndex !== -1) {
      products[findIndex] = data;
      fs.writeFileSync(pathname, JSON.stringify(products), "utf8");
      return NextResponse.json({ message: "Cập nhập thành công", data: data });
    } else {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}