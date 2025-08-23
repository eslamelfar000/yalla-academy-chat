import React, { useState } from "react";
import { motion } from "framer-motion";
import TeacherCard from "../TeacherCard/TeacherCard";
import TeacherCardSkeleton from "../TeacherCard/TeacherCardSkeleton";
import Teachers from "../HomeTeachers/Data";
import { useGetData } from "@/hooks/useGetData";
import TeachersPagination from "../ui/teachers-pagination";
import { SearchIcon } from "lucide-react";

function AllTeacherSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: teachersData,
    isLoading,
    error,
  } = useGetData({
    endpoint: `teachers?page=${currentPage}`,
    queryKey: ["teachers", currentPage],
  });

  // Use API data if available, otherwise fall back to static data
  const teachersToShow = teachersData?.data?.teachers || Teachers || [];
  const pagination = teachersData?.data?.pagination;

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
        className="cover items-center justify-center pb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="sec-head my-10 text-center w-full"
          variants={titleVariants}
        >
          <h1 className="text-3xl font-bold">Get To Know Our Teachers</h1>
          <span className="text-main">__________________</span>

          {/* Show error state */}
          {error && (
            <motion.div
              className="mt-4 text-sm text-red-500"
              variants={titleVariants}
            >
              Failed to load teachers from API, showing demo data
            </motion.div>
          )}
        </motion.div>
        <div className="cards flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeleton cards while loading with staggered animations
              Array.from({ length: pagination?.per_page || 6 }).map(
                (_, index) => (
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
                )
              )
            ) : // Show actual teacher cards
            teachersToShow?.length > 0 ? (
              teachersToShow?.map((teacher, index) => (
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
                  className="w-120 h-120"
                />
                <p className="text-main bg-main/30 rounded-lg p-3 px-10 text-lg">
                  No Teachers Found
                </p>
              </motion.div>
            )}
          </div>
        </div>
        {/* Pagination */}
        {pagination && !isLoading && teachersToShow?.length > 0 && (
          <motion.div
            className="pagination flex justify-center items-center mt-10"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6 }}
          >
            <TeachersPagination
              last_page={pagination?.last_page}
              setCurrentPage={setCurrentPage}
              current_page={currentPage}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default AllTeacherSection;
