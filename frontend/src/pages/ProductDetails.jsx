import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWhatsAppOrder = () => {
    const phone = "254702252415";
    const message = encodeURIComponent(
      `Hello! I'm interested in *${
        product.name
      }* (KES ${product.price.toLocaleString()}).\n\nCan you tell me more about availability and delivery?`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-100">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link
          to="/"
          className="text-indigo-600 underline hover:text-indigo-500"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <section className="relative py-24 bg-gradient-to-br from-amber-50 via-purple-50 to-rose-100 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/40 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-indigo-600 mb-10 hover:text-indigo-500 transition font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>

        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl grid md:grid-cols-2 gap-10 p-8 border border-white/40"
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-white/50 backdrop-blur-lg rounded-2xl p-6 flex items-center justify-center overflow-hidden"
          >
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="max-h-[460px] object-contain rounded-2xl transition-transform duration-700 hover:scale-105"
            />
            <span
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${
                product.stock > 0 ? "bg-green-500/80" : "bg-red-500/80"
              } shadow-md`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                {product.name}
              </h1>
              <p className="text-sm uppercase tracking-wide text-indigo-500 mb-2">
                {product.category?.name || "Uncategorized"}
              </p>
              <p className="text-3xl font-bold text-indigo-600 mb-6">
                KES {Number(product.price).toLocaleString()}
              </p>

              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {product.specifications.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-white/40 backdrop-blur-md rounded-xl p-3 hover:bg-white/60 transition"
                      >
                        <p className="text-xs uppercase text-gray-500">
                          {spec.key}
                        </p>
                        <p className="text-gray-800 font-medium">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {product.stock > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-purple-400/40 transition"
                >
                  Add to Cart
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppOrder}
                className="flex-1 px-6 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-green-400/40 flex items-center justify-center gap-2 transition"
              >
                <FaWhatsapp className="text-lg" /> Order on WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
