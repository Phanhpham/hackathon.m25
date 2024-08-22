import { log } from 'console';
import { NextRequest, NextResponse } from "next/server";
const users=[
    { id: 1, name: "Cam", price: "12.000 VNĐ", quantity: 12, image: "https://suckhoedoisong.qltns.mediacdn.vn/Images/thanhloan/2016/06/05/tac-dung-cua-qua-cam-2.jpg" },
    { id: 2, name: "Áo thun", price: "60.000 VNĐ", quantity: 24, image: "https://dosi-in.com/images/detailed/442/dosiin-mvr-maverick-ao-thun-unisex-phong-cotton-hai-phong-haiphong-fact-under-mvr-bb-442070442070.jpg" },
    { id: 3, name: "Giày", price: "120.000 VNĐ", quantity: 35, image: "https://gman.vn/wp-content/uploads/2023/07/giay-sneaker-nu-kieu-dang-hien-dai-mau-trang-xanh.jpg" },
    { id: 4, name: "Bông tai", price: "100.000 VNĐ", quantity: 20, image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/337/219/products/hoa-tai-nu-bac-dinh-pha-le-bong-tuyet-bac-hieu-minh.jpg?v=1668993818887" },
    { id: 5, name: "Nhẫn", price: "160.000 VNĐ", quantity: 40, image: "https://pos.nvncdn.com/331316-3334/ps/20230622_8n0TFLCQcH.jpeg" },
]
export async function GET () {
    return NextResponse.json({data:users});

}
export async function POST(request:NextRequest) {
    // console.log("Request:",await request.json());
    // buoc 1:lay du lieu tu client 
    const dataClient = await request.json();

    // buoc 2: push du lieu lay dc tu client vao trong mang 
    users.push(dataClient);

    //buoc 3:tra ve mang moi dc them vao ;
    return NextResponse.json ({newUsers:users})

    
    // return NextResponse.json({message:"POST method"})
}