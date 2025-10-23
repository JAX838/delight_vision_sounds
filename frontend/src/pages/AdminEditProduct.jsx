import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
      setSpecifications(res.data.specifications || []); // ✅ load existing specs
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load product." });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f);
  };

  // ✅ Specification Handlers
  const handleSpecChange = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleAddSpec = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index) => {
    const updated = specifications.filter((_, i) => i !== index);
    setSpecifications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) {
      setMessage({ type: "error", text: "Name and price are required." });
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("specifications", JSON.stringify(specifications)); // ✅ send specs
    if (product.category) formData.append("category", product.category);
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("adminToken");
      await api.put(`/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ type: "success", text: "Product updated successfully!" });
      setTimeout(() => navigate("/admin/products"), 1000);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Update failed.",
      });
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Edit Product</h1>
          <Link to="/admin/products" className="text-sm text-indigo-600">
            ← Back to products
          </Link>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* BASIC INFO */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="mt-1 w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Price (KES)</label>
              <input
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Stock</label>
              <input
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: Number(e.target.value) })
                }
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={product.category || ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="mt-1 w-full border rounded px-3 py-2"
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ SPECIFICATIONS SECTION */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Specifications
            </label>
            <div className="space-y-3">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border rounded-lg p-2"
                >
                  <input
                    type="text"
                    placeholder="Specification name (e.g. Power)"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecChange(index, "key", e.target.value)
                    }
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 300W)"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecChange(index, "value", e.target.value)
                    }
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                + Add Specification
              </button>
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="mt-1"
            />
            {product.image && (
              <img
                src={product.image}
                alt="Current"
                className="mt-3 w-24 h-24 rounded object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
