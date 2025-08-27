import React from "react";
import { motion } from "framer-motion";
import TeacherCard from "../TeacherCard/TeacherCard";
import Teachers from "./Data";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import TeacherCardSkeleton from "../TeacherCard/TeacherCardSkeleton";

function HomeTeachers({ teachers, isLoading }) {
  console.log("teachers", teachers);
  const homeTeacher = teachers || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        className="cover py-20 items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="sec-head mb-10 text-center w-full"
          variants={titleVariants}
        >
          <h1 className="text-3xl font-bold">Get To Know Our Teachers</h1>
        </motion.div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeleton cards while loading with staggered animations
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TeacherCardSkeleton />
                </motion.div>
              ))
            ) : homeTeacher?.length > 0 ? (
              homeTeacher
                ?.map((teacher, index) => (
                  <motion.div
                    key={teacher.id || index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TeacherCard teacher={teacher} />
                  </motion.div>
                ))
                .slice(0, 6)
            ) : (
              <motion.div
                className="text-center font-bold col-span-3 flex flex-col justify-center items-center h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <img
                  src={"/not-found.png"}
                  alt="search"
                  className="w-100 h-100"
                />
                <p className="text-main bg-main/30 rounded-lg p-3 px-10 text-lg">
                  No Teachers Found
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {homeTeacher?.length > 0 && (
          <motion.div
            className="flex justify-center mt-10"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6 }}
          >
            <Link to={"/teachers"}>
              <button className="btn bg-white border-2 border-solid border-main rounded-xl text-main  hover:bg-main hover:text-white">
                Show More
                <ArrowRightIcon width={20} />
              </button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default HomeTeachers;
