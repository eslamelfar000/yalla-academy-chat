import React from "react";
import { motion } from "framer-motion";
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-2.png";

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

  // Card data with index
  const cards = [
    { id: 1, image: card1, delay: 0.1 },
    { id: 2, image: card2, delay: 0.2 },
    { id: 3, image: card3, delay: 0.3 },
  ];

  return (
    <>
      <motion.div
        className="flex justify-center py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="group card bg-base-100 w-85"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: card.delay + index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <figure className="border-1 border-solid border-main">
                <img
                  src={card.image}
                  alt=""
                  className="group-hover:scale-90 transition duration-500"
                />
              </figure>
              <div className="card-body">
                <p className="font-[500] group-hover:text-main-dark transition duration-300">
                  Achieve fluency with lessons tailored to your specific goals
                  and needs.
                </p>
                <div className="card-actions justify-end"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default HomeCards;
