import React from "react";
import { motion } from "framer-motion";

function HomeCards() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  // Card data with titles, descriptions, and creative icons
  const cards = [
    {
      id: 1,
      delay: 0.1,
      title: "Personalized Learning",
      description:
        "Achieve fluency with lessons tailored to your specific goals and learning style.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      delay: 0.2,
      title: "Expert Teachers",
      description:
        "Learn from certified native speakers who understand your learning journey.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      gradient: "from-purple-400 to-purple-600",
    },
    {
      id: 3,
      delay: 0.3,
      title: "Flexible Schedule",
      description:
        "Study at your own pace with 24/7 access to lessons and materials.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-green-400 to-green-600",
    },
  ];

  return (
    <>
      <motion.div
        className="flex justify-center py-10 px-4 mt-[-200px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="group relative"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: card.delay + index * 0.1 }}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-[#5685ce]/20">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5685ce]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                {/* Icon Section */}
                <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-[#5685ce]/5 group-hover:to-[#5685ce]/10 transition-all duration-500 overflow-hidden">
                  {/* Animated Background Shapes */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    {/* Large Floating Circles */}
                    <motion.div
                      className="absolute top-2 left-2 w-16 h-16 border-2 border-[#5685ce] rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute top-6 right-6 w-8 h-8 bg-[#5685ce]/30 rounded-full"
                      animate={{
                        y: [0, 15, 0],
                        x: [0, 5, 0],
                        scale: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />

                    {/* Geometric Shapes */}
                    <motion.div
                      className="absolute bottom-4 left-4 w-12 h-12 border-2 border-[#5685ce]/40 transform rotate-45"
                      animate={{
                        rotate: [45, 225, 45],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />

                    {/* Small Floating Dots */}
                    <motion.div
                      className="absolute bottom-8 right-8 w-3 h-3 bg-[#5685ce]/50 rounded-full"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                    />

                    {/* Hexagon Shape */}
                    <motion.div
                      className="absolute top-1/2 left-1/4 w-6 h-6 bg-gradient-to-r from-[#5685ce]/20 to-[#5685ce]/40"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      }}
                      animate={{
                        rotate: [0, 120, 240, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                    />

                    {/* Triangle Shape */}
                    <motion.div
                      className="absolute top-1/3 right-1/4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-[#5685ce]/30"
                      animate={{
                        y: [0, 10, -5, 0],
                        rotate: [0, 60, 120, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                      }}
                    />

                    {/* Wave Pattern */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-8 opacity-20"
                      animate={{
                        scaleX: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg viewBox="0 0 100 20" className="w-full h-full">
                        <path
                          d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z"
                          fill="url(#waveGradient)"
                        />
                        <defs>
                          <linearGradient
                            id="waveGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#5685ce"
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="50%"
                              stopColor="#5685ce"
                              stopOpacity="0.1"
                            />
                            <stop
                              offset="100%"
                              stopColor="#5685ce"
                              stopOpacity="0.3"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Main Icon */}
                  <div
                    className={`relative z-10 bg-gradient-to-br ${card.gradient} text-white rounded-2xl p-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    {card.icon}
                  </div>

                  {/* Additional Floating Elements */}
                  <motion.div
                    className="absolute top-8 right-8 w-2 h-2 bg-[#5685ce]/40 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-[#5685ce]/50 rounded-full"
                    animate={{
                      y: [0, -15, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#5685ce]/60 rounded-full"
                    animate={{
                      x: [0, 10, -5, 0],
                      y: [0, -8, 4, 0],
                      scale: [1, 0.5, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2.5,
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#5685ce] transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5685ce] to-[#3c629d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Corner Accent */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#5685ce]/10 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default HomeCards;
