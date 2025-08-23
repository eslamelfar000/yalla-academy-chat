import React from "react";
import { motion } from "framer-motion";
import teachback from "../../assets/back1.jpg";

function SecHeader({ title, subtitle, size }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        className={`relative w-full bg-cover bg-center bg-no-repeat ${
          size ? "hidden lg:flex" : "flex"
        }`}
        style={{ backgroundImage: `url(${teachback})` }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-10 text-center w-full py-20 before:bg-black before:opacity-70 before:absolute before:left-0 before:top-0 before:w-full before:h-full before:z-0">
          <motion.div className="z-10 relative" variants={containerVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-5"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.h1
              className="text-main text-4xl md:text-5xl font-bold"
              variants={itemVariants}
            >
              {subtitle}
            </motion.h1>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default SecHeader;
