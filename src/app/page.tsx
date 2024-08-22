
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [products, setProduct] = useState<any>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
    quantity: "",
  });
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Get data
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {});
  }, []);

  // Handle add product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/products", newProduct)
      .then((res) => {
        setProduct([...products, res.data.data]);
        setNewProduct({
          name: "",
          image: "",
          price: "",
          quantity: "",
        });
      })
      .catch((err) => {});
  };

  // Handle edit product
  const handleEditProduct = (id: number) => {
    const productToEdit = products.find((product: any) => product.id === id);
    setEditingProduct(productToEdit);
  };

  // Handle save edited product
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/api/users/${editingProduct.id}`,
        editingProduct
      )
      .then((res) => {
        setProduct(
          products.map((product: any) =>
            product.id === editingProduct.id ? res.data.data : product
          )
        );
        setEditingProduct(null);
      })
      .catch((err) => {});
  };

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then(() => {
        setProduct(products.filter((product: any) => product.id !== id));
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="flex justify-between items-start gap-4 mt-10">
        <div className="w-2/3">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-600 p-10">
                <th className="py-2">STT</th>
                <th className="py-2">Tên sản phẩm</th>
                <th className="py-2">Hình ảnh</th>
                <th className="py-2">Giá</th>
                <th className="py-2">Số lượng</th>
                <th className="py-2">Chức năng</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product: any, index: number) => {
                return (
                  <tr key={product.id} className="text-center">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">
                      <img
                        src={product.image}
                        alt="product"
                        className="w-16 h-16 mx-auto"
                      />
                    </td>
                    <td className="py-2">{product.price}</td>
                    <td className="py-2">{product.quantity}</td>
                    <td className="py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
          <h3 className="font-semibold text-xl mb-4">
            {editingProduct ? "Sửa sản phẩm" : "Thêm mới sản phẩm"}
          </h3>
          <form onSubmit={editingProduct ? handleSaveEdit : handleAddProduct}>
            <div className="mb-4">
              <label className="block text-gray-700">Tên</label>
              <input
                type="text"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Hình ảnh</label>
              <input
                type="text"
                value={editingProduct ? editingProduct.image : newProduct.image}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        image: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Giá</label>
              <input
                type="text"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Số lượng</label>
              <input
                type="text"
                value={
                  editingProduct ? editingProduct.quantity : newProduct.quantity
                }
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({
                        ...editingProduct,
                        quantity: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-4 rounded hover:bg-green-600"
            >
              {editingProduct ? "Lưu thay đổi" : "Thêm"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
