import React from "react";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const FB_USERNAME = "Delight Vision Sounds";
const TIKTOK_USERNAME = "DelightVisionSounds";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 mt-16 overflow-hidden">
      {/* ✨ Floating Gradient Glow */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.2),transparent_70%)] pointer-events-none"></div>

      <div className="relative container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 z-10">
        {/* 🎧 Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide">
            Delight Vision Sounds
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            Experience sound like never before. We provide premium-quality
            speakers, microphones, amplifiers, and professional-grade audio
            systems that bring your events to life.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-blue-500 after:rounded-full after:mt-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", to: "/" },
              { name: "Products", to: "/products" },
              { name: "Services", to: "/services" },
              { name: "About Us", to: "/about" },
              { name: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-blue-400 transition duration-300 hover:translate-x-1 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 🌐 Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-pink-500 after:rounded-full after:mt-2">
            Connect With Us
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Follow us on social media and stay updated with our latest products,
            offers, and sound experiences.
          </p>

          <div className="flex space-x-5">
            <a
              href='https://www.facebook.com/profile.php?id=61572944829355"'
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-blue-500/40 transform hover:-translate-y-1"
            >
              <FaFacebookF className="text-lg" />
            </a>

            <a
              href="https://www.tiktok.com/@delightvisionsoun"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition duration-300 shadow-md hover:shadow-pink-500/40 transform hover:-translate-y-1"
            >
              <FaTiktok className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* 🩶 Divider */}
      <div className="relative mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Delight Vision Sounds</span>.
          All Rights Reserved.{" "}
          <span className="text-gray-400 italic">Designed by Maroots</span>.
        </p>
      </div>

      {/* 🎶 Subtle animated glow bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 animate-pulse"></div>
    </footer>
  );
}
