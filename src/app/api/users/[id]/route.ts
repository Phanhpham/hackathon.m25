import { NextResponse } from "next/server";
const users = [
    { id: 1, name: "Nguyen Van A" },
    { id: 2, name: "Nguyen Thi B" },
]
export async function GET(req: NextResponse, params: { params: { id: string } }) {
    // B1 : Lay id tu params
    const id = params.params.id //params.params.id
    // B2 : Tim kiem user theo id trong mang
    const findUser = users.find((user) => user.id === +id)
    // Tra ve ket qua cho nguoi dung
    if (findUser) {
        return NextResponse.json(findUser)
    }
    return NextResponse.json({ message: "Ko tim thay tai khoan" })
}

export async function PUT(req: NextResponse, params: { params: { id: string } }) {
    // console.log(await req.json(), params);
    // b1 : Lay id va du lieu can cap nhat tu nguoi dung
    const id = params.params.id;
    const dataClient = await req.json();
    // Tim kiem vi tri user trong mang
    const findIndex = users.findIndex((user) => user.id === +id);
    if (findIndex !== -1) {
        // B3 : Cap nhat du lieu - Gan lai gia tri
        users[findIndex].name = dataClient.name;

    }
    return NextResponse.json({ data: users })
}
