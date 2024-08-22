import { NextResponse } from "next/server";

const users = [
  {
    id: 1,
    name: "phuong anh",
    age: 20,
  },
  {
    id: 2,
    name: "phuong anh",
    age: 20,
  },
];

export async function GET(req: any, res: any) {
  let find = users.find((item) => {
    return item.id == res.params.id;
  });

  return NextResponse.json({
    message: find ? find : `không thấy người dùng có id = ${res.params.id}`,
  });
}

export async function DELETE(req: any) {
  const data = await req.json();
  return NextResponse.json({
    messenge: "Xóa thông tin tài khoản thành công",
  });
}

export async function PUT(request: any) {
  const data = await request.json();
  return NextResponse.json({
    messenge: "cập nhật thông tin tài khoản thành công",
    user: data,
  });
}