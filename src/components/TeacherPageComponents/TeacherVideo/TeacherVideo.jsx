import Cookies from "js-cookie";
import { EyeIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import YouTubeEmbed from "../../../helper/YouTubeEmbed";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function TeacherVideo({ teacher }) {
  const navigate = useNavigate();

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

  // Handle case where teacher is undefined
  if (!teacher) {
    return (
      <motion.div
        className="cover"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center py-8 text-gray-500">
          No teacher data available
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="cover"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="video-section bg-white p-5 rounded-md shadow-lg mb-5"
        variants={cardVariants}
        whileHover={{
          y: -5,
          transition: { duration: 0.3 },
        }}
      >
        <motion.h2
          className="text-xl font-bold mb-4 text-gray-800"
          variants={itemVariants}
        >
          Introduction Video
        </motion.h2>

        {teacher?.video_link ? (
          <motion.div
            className="video-container relative"
            variants={itemVariants}
          >
            <YouTubeEmbed
              url={teacher.video_link}
              title="Teacher Introduction"
              className="w-full h-64 rounded-lg"
            />
          </motion.div>
        ) : (
          <motion.div
            className="no-video text-center py-8 bg-gray-100 rounded-lg"
            variants={itemVariants}
          >
            <p className="text-gray-500">No introduction video available</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="action-buttons bg-white p-5 rounded-md shadow-lg"
        variants={cardVariants}
        whileHover={{
          y: -5,
          transition: { duration: 0.3 },
        }}
      >
        <motion.h3
          className="text-lg font-semibold mb-4 text-gray-800"
          variants={itemVariants}
        >
          Book a Session
        </motion.h3>

        <motion.div
          className="price-info mb-4 p-4 bg-gray-50 rounded-lg"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Session Price:</span>
            {localStorage.getItem("yall_user_data") &&
            Cookies.get("yall_auth_token") ? (
              <span className="text-2xl font-bold text-main">
                ${teacher?.package_before_price || "N/A"}
              </span>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
              >
                <EyeIcon
                  onClick={() => {
                    toast.warning("Please login to see the price", {
                      duration: 5000,
                      action: {
                        label: "Login",
                        onClick: () => {
                          navigate("/login");
                        },
                      },
                    });
                  }}
                  width={25}
                  className="opacity-70 hover:text-main transition duration-300 hover:opacity-100 cursor-pointer"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div className="buttons space-y-3" variants={itemVariants}>
          <motion.div
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            {/* <Link
              to={`/booking/${teacher?.id || teacher?.user_id}`}
              className="block"
            > */}
            <button
              onClick={() => {
                if (
                  JSON.parse(localStorage.getItem("yall_user_data")) &&
                  Cookies.get("yall_auth_token")
                ) {
                  navigate(`/booking/${teacher?.id || teacher?.user_id}`);
                } else {
                  toast.warning(
                    "Please login to book session with this teacher",
                    {
                      duration: 5000,
                      action: {
                        label: "Login",
                        onClick: () => {
                          navigate("/login");
                        },
                      },
                    }
                  );
                }
              }}
              className="btn bg-main text-white w-full hover:bg-main-dark rounded-md border-none shadow-none"
            >
              Book Session Now
            </button>
            {/* </Link> */}
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <button
              onClick={() => {
                if (
                  JSON.parse(localStorage.getItem("yall_user_data"))
                    ?.assiend_teacher?.id === teacher?.user_id &&
                  JSON.parse(localStorage.getItem("yall_user_data"))
                    ?.assiend_teacher !== null &&
                  Cookies.get("yall_auth_token")
                ) {
                  navigate("/chat");
                } else if (
                  localStorage.getItem("yall_user_data") &&
                  Cookies.get("yall_auth_token") &&
                  (JSON.parse(localStorage.getItem("yall_user_data"))
                    ?.assiend_teacher === null ||
                    (JSON.parse(localStorage.getItem("yall_user_data"))
                      ?.assiend_teacher !== null &&
                      JSON.parse(localStorage.getItem("yall_user_data"))
                        ?.assiend_teacher?.id !== teacher?.user_id))
                ) {
                  toast.warning("You are not assigned to this teacher", {
                    duration: 5000,
                    action: {
                      label: "close",
                    },
                  });
                } else {
                  toast.warning("Please login to contact the teacher", {
                    duration: 5000,
                    action: {
                      label: "Login",
                      onClick: () => {
                        navigate("/login");
                      },
                    },
                  });
                }
              }}
              className="btn shadow-none border-none w-full bg-second-dark rounded-md hover:bg-white border-1 border-solid border-second-dark hover:border-main hover:text-main transition-colors"
            >
              Contact teacher
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TeacherVideo;
