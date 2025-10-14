import React from "react";
import { motion } from "framer-motion";
import hero from "../../assets/hero.png";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Hero() {
  const user =
    JSON.parse(localStorage.getItem("yall_user_data")) &&
    Cookies.get("yall_auth_token");

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        className="hero pt-20 pb-60 sm:px-5 lg:px-20 xl:px-0 bg-gradient-to-b from-main-light to-white bg-main-light"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <motion.div
            className="hero-img flex-1 flex justify-center items-center"
            variants={imageVariants}
          >
            <img
              src={hero}
              className="w-auto rounded-lg hover:scale-90 transition duration-300"
            />
          </motion.div>
          <motion.div
            className="flex-1 mb-10 lg:mb-0"
            variants={containerVariants}
          >
            <motion.h1 className="text-5xl font-bold" variants={itemVariants}>
              Become fluent in Arabic With{" "}
              <span className="text-main">Yalla</span>
            </motion.h1>

            <motion.ul
              className="flex flex-col gap-5 py-8"
              variants={containerVariants}
            >
              <motion.li
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <CheckIcon className="size-4 bg-main text-white rounded-sm " />
                <p>Start speaking Arabic with confidence in no time</p>
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <CheckIcon className="size-4 bg-main text-white rounded-sm " />
                <p>
                  Gain confidence with expert guidance and real-world practice
                </p>
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <CheckIcon className="size-4 bg-main text-white rounded-sm " />
                <p>
                  Find joy in learning with supportive and skilled instructors
                </p>
              </motion.li>
            </motion.ul>

            {!user && (
              <motion.div variants={itemVariants}>
                <Link to={"/register"}>
                  <button className="btn bg-main text-white rounded-md py-6 shadow-none border-none hover:bg-main-dark">
                    Sign up for your free trial now
                  </button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Hero;
