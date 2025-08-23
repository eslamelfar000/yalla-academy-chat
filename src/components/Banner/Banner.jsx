import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import banner from "../../assets/banner.png";
import { useSettings } from "../../context/SettingsContext";
import BannerSkeleton from "./BannerSkeleton";

function Banner() {
  const { banner: bannerData, isLoading, error } = useSettings();

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
    hidden: { opacity: 0, scale: 0.9, x: 30 },
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

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <BannerSkeleton />;
  }

  // Show error state if there's an error
  if (error) {
    return (
      <motion.div
        className="cover flex justify-center items-center bg-second lg:h-110"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Error Loading Banner
          </h2>
          <p className="text-gray-600">
            Failed to load banner content. Please try again later.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Extract data from banner settings
  const {
    title = "Support doesn't end with a claim",
    partner_logo,
    description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo.",
    banner: bannerImage = banner,
    logo: logoImage = logo,
  } = bannerData;

  if (bannerData?.partner === "false") {
    return null;
  }

  return (
    <>
      <motion.div
        className="cover flex justify-center items-center bg-second"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl px-6 mx-auto grid grid-cols-12 items-center py-20">
          <motion.div
            className="left col-span-12 md:col-span-7 pr-10 xl:pr-30 mb-10 lg:mb-0"
            variants={itemVariants}
          >
            <motion.div
              className="header flex items-center gap-3 mb-10"
              variants={itemVariants}
            >
              {partner_logo && (
                <motion.div
                  className="border-r-2 border-second-dark border-solid pr-5 mr-2"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <img
                    src={partner_logo}
                    alt="Partner Logo"
                    className="w-[150px] h-[100px] rounded-lg object-contain"
                  />
                </motion.div>
              )}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src={logoImage}
                  alt="Logo"
                  className="w-[150px] h-[100px] rounded-lg object-contain"
                />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-2xl xl:text-3xl font-[600] mb-5"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.p
              className="opacity-90 text-sm lg:text-md mb-5"
              variants={itemVariants}
            >
              {description}
            </motion.p>

            {/* <button className="btn bg-second text-main shadow-none border-1 border-solid border-main hover:bg-main hover:text-white transoition ">
              Get Started
            </button> */}
          </motion.div>

          <motion.div
            className="col-span-12 md:col-span-5 h-full w-full flex-1 flex justify-center items-center"
            variants={imageVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-full rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Banner;
