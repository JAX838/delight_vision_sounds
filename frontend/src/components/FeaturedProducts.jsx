import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import WhyChooseUsAndServices from "./WhyChooseUsAndServices";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <section
        className="relative py-24 bg-gradient-to-br from-amber-50 via-purple-50 to-rose-100 overflow-hidden"
        id="featured"
      >
        {/* Decorative glows */}
        <div className="absolute -top-32 left-0 w-96 h-96 bg-purple-300/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/40 blur-3xl rounded-full"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Section Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-green-500 mx-auto mb-10 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          ></motion.div>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base leading-relaxed">
            Discover our top-rated electrical and security solutions —
            handpicked to blend performance, reliability, and modern design.
          </p>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-4 shadow-md animate-pulse overflow-hidden"
                >
                  <div className="w-full h-52 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-2xl"></div>
                  <div className="mt-5 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No featured products available.</p>
          ) : (
            // Product Grid
            <motion.div
              className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              viewport={{ once: true }}
            >
              {products.map((p) => (
                <motion.div
                  key={p._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden cursor-pointer border border-white/40 group"
                  onClick={() => handleViewDetails(p._id)}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={p.imageUrl || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1.5 rounded-full text-white backdrop-blur-sm ${
                        p.stock > 0 ? "bg-green-500/80" : "bg-red-500/80"
                      } shadow-md`}
                    >
                      {p.stock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 text-left">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {p.category?.name || "Uncategorized"}
                    </p>
                    <p className="text-indigo-600 font-bold text-xl">
                      KES {Number(p.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                    whileHover={{ scale: 1.05 }}
                    disabled={p.stock <= 0}
                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-full font-semibold text-white shadow-md transition-all duration-300 group-hover:opacity-100 opacity-0 ${
                      p.stock > 0
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* View All Button */}
          {!loading && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-14"
            >
              <Link
                to="/products"
                className="inline-block px-8 py-3 rounded-full text-white text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-amber-400/50 hover:scale-105 duration-300"
              >
                View All Products
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <WhyChooseUsAndServices />
    </>
  );
}
