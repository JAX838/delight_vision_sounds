import React from "react";
import {
  FiTruck,
  FiShield,
  FiHeadphones,
  FiMusic,
  FiBriefcase,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyChooseUsAndServices() {
  return (
    <div
      className="relative bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 py-24 overflow-hidden"
      id="services"
    >
      {/* Background accent glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-300/30 blur-3xl rounded-full"></div>

      {/* === WHY CHOOSE US === */}
      <section className="container mx-auto px-6 mb-24 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>
        <motion.div
          className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-green-500 mx-auto mb-12 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              icon: <FiTruck />,
              title: "Swift, Dependable Delivery",
              desc: "Nationwide delivery that ensures your audio gear arrives fast and flawless.",
            },
            {
              icon: <FiShield />,
              title: "Premium Brands & Warranty",
              desc: "Top-tier, long-lasting brands — backed by certified warranties you can trust.",
            },
            {
              icon: <FiHeadphones />,
              title: "Expert Technical Support",
              desc: "Professionals to guide your setup, tuning, and every technical detail.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white/50 backdrop-blur-xl rounded-3xl p-10 text-center shadow-lg border border-white/40 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex justify-center items-center mb-6">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon, { className: "text-3xl" })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === WAVE DIVIDER === */}
      <div className="relative h-24 mb-24 overflow-hidden">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute inset-0 w-full h-full text-purple-500 opacity-40"
          initial={{ x: -100 }}
          animate={{ x: 100 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 10,
            ease: "easeInOut",
          }}
        >
          <path
            fill="currentColor"
            d="M0,160L60,154.7C120,149,240,139,360,144C480,149,600,171,720,170.7C840,171,960,149,1080,149.3C1200,149,1320,171,1380,181.3L1440,192V0H0Z"
          ></path>
        </motion.svg>
      </div>

      {/* === OUR SERVICES === */}
      <section className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-green-500 mx-auto mb-12 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              icon: <FiMusic />,
              title: "Sound System Sales",
              items: [
                "Professional speakers & subwoofers",
                "Mixers and amplifiers",
                "Microphones (wired & wireless)",
                "DJ and studio gear",
                "Public address systems",
              ],
            },
            {
              icon: <FiBriefcase />,
              title: "Installation & Setup",
              items: [
                "Event and church setups",
                "Auditorium sound design",
                "Conference room solutions",
                "Studio acoustic configuration",
              ],
            },
            {
              icon: <FiAlertTriangle />,
              title: "Maintenance & Support",
              items: [
                "Troubleshooting & repairs",
                "Calibration & tuning",
                "Software & firmware updates",
                "On-site technical help",
              ],
            },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-3xl shadow-lg p-10 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:scale-110 transition-transform">
                  {React.cloneElement(section.icon, { className: "text-3xl" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-3">
                  {section.title}
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 text-left">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
