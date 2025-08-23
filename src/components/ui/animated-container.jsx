import React from "react";
import { motion } from "framer-motion";

// Reusable animation variants
export const fadeInUp = {
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

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
};

// Animated Container Component
const AnimatedContainer = ({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
  duration = 0.6,
  ...props
}) => {
  const variants = {
    fadeInUp: { ...fadeInUp, transition: { ...fadeInUp.transition, delay } },
    fadeInLeft: {
      ...fadeInLeft,
      transition: { ...fadeInLeft.transition, delay },
    },
    fadeInRight: {
      ...fadeInRight,
      transition: { ...fadeInRight.transition, delay },
    },
    fadeInScale: {
      ...fadeInScale,
      transition: { ...fadeInScale.transition, delay },
    },
    custom: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: "easeOut" },
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants[variant] || variants.fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated List Component for staggered animations
export const AnimatedList = ({
  children,
  className = "",
  staggerDelay = 0.1,
  ...props
}) => {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated List Item Component
export const AnimatedListItem = ({
  children,
  className = "",
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay,
            ease: "easeOut",
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
