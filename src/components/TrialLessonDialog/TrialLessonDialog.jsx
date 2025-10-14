import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  BookOpen,
  Star,
  Clock,
  Users,
  ArrowRight,
  Gift,
  CheckCircle,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

function TrialLessonDialog({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserDataContext();

  const handleBookNow = () => {
    onClose();
    if (isAuthenticated) {
      navigate("/teachers");
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        size="2xl"
        className="overflow-hidden border-0 bg-white dark:bg-gray-900 p-0 max-h-[80vh] overflow-y-auto"
        overlayClass="backdrop-blur-md"
      >
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Side - Main Content */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <DialogHeader className="text-center lg:text-left space-y-4">
              {/* Gift Icon with Animation */}
              <motion.div
                className="mx-auto lg:mx-0 w-16 h-16 bg-main rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DialogTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  🎉 Free Trial Lesson Available!
                </DialogTitle>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Badge
                  color="success"
                  className="text-sm px-4 py-1 bg-green-500 text-white border-0 shadow-lg mx-auto lg:mx-0 w-fit"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Limited Time Offer
                </Badge>
              </motion.div>
            </DialogHeader>

            <motion.div
              className="space-y-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Description */}
              <DialogDescription className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center lg:text-left">
                You have an exclusive{" "}
                <span className="font-semibold text-main">
                  free trial lesson
                </span>{" "}
                waiting for you! Experience our world-class teaching quality and
                find your perfect match.
              </DialogDescription>

              {/* Benefits List */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-center lg:text-left">
                  What you'll get:
                </h4>
                <div className="space-y-2">
                  {[
                    "1 Hour Personalized Lesson",
                    "Choose from many Expert Teachers",
                    "Interactive Learning Materials",
                    "Progress Tracking & Feedback",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button
                  onClick={handleBookNow}
                  size="lg"
                  color="main"
                  className="flex-1 bg-main hover:bg-main-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Book Your Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2  transition-all duration-300"
                >
                  Maybe Later
                </Button>
              </motion.div>

              {/* Footer Info */}
              <motion.div
                className="text-center lg:text-left text-xs text-gray-500 dark:text-gray-400 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {isAuthenticated ? (
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Users className="w-3 h-3" />
                    <span>Browse our teachers to book your trial lesson</span>
                  </div>
                ) : (
                  <span>Sign in to book your trial lesson</span>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Features */}
          <div className="bg-main/5 dark:bg-main/10 p-8 flex flex-col justify-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                Why Choose Us?
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: Star,
                    text: "5-Star Rated Teachers",
                    description: "Learn from the best educators",
                    color: "text-yellow-500",
                  },
                  {
                    icon: Clock,
                    text: "Flexible Scheduling",
                    description: "Book lessons at your convenience",
                    color: "text-blue-500",
                  },
                  {
                    icon: Users,
                    text: "Personalized Learning",
                    description: "Tailored to your learning style",
                    color: "text-green-500",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div
                      className={`p-2 rounded-lg bg-white/80 dark:bg-gray-700/80`}
                    >
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                        {feature.text}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TrialLessonDialog;
