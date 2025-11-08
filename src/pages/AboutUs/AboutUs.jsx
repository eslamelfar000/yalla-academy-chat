import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";
import { Link } from "react-router-dom";
import useAuthToken from "@/hooks/use-auth-token";
import YouTubeEmbed from "@/helper/YouTubeEmbed";
import { useSettings } from "@/context/SettingsContext";
import AboutUsSkeleton from "../../components/AboutUs/AboutUsSkeleton";

const AboutUs = () => {
  const { getToken } = useAuthToken();
  const token = getToken();

  const { settings, isLoading, error } = useSettings();

  // Extract about us data from settings
  const aboutUsTitle = settings?.about_us_title || "Empowering Students";
  const aboutUsSubtitle =
    settings?.about_us_subtitle || "Through Quality Education";
  const aboutUsDescription =
    settings?.about_us_description ||
    "We're on a mission to make quality education accessible to everyone, connecting students with expert teachers worldwide.";
  const aboutUsVideo = settings?.about_us_video;

  // Show loading skeleton while fetching data
  if (isLoading) {
    return (
      <LayoutWithVerification>
        <Navbar />
        <AboutUsSkeleton />
        <Footer />
      </LayoutWithVerification>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <LayoutWithVerification>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Error Loading About Us Information
            </h2>
            <p className="text-gray-600">
              Failed to load about us details. Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </LayoutWithVerification>
    );
  }

  const values = [
    {
      icon: "tabler:heart",
      title: "Passion for Education",
      description:
        "We believe in teaching Arabic with passion and creativity, making learning enjoyable and inspiring",
      color: "bg-red-50 border-red-200",
    },
    {
      icon: "tabler:target",
      title: "Excellence",
      description:
        "We connect language with culture, helping students truly experience the Arab world.",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: "tabler:users-group",
      title: "Community",
      description:
        "We are committed to quality, accessibility, and building a supportive learning community.",
      color: "bg-green-50 border-green-200",
    },
  ];

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

  return (
    <LayoutWithVerification>
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative py-20 flex items-center justify-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-main-dark"></div>
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          variants={itemVariants}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
          variants={itemVariants}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"
          variants={itemVariants}
        ></motion.div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            {aboutUsTitle}
            <span className="block text-4xl md:text-5xl font-light mt-2">
              {aboutUsSubtitle}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {aboutUsDescription}
          </motion.p>
        </div>
      </motion.section>

      {/* Intro Video Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <Badge className="bg-[#5685CE] text-white mb-4">Intro Video</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get to Know Us in 90 Seconds
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch this short video to learn how we empower students and
              connect them with expert teachers worldwide.
            </p>
          </motion.div>
          <motion.div
            className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Responsive 16:9 container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              {aboutUsVideo ? (
                <YouTubeEmbed
                  url={aboutUsVideo}
                  title="About Us Video"
                  className="absolute top-0 left-0 w-full h-full"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                  <Icon icon="tabler:video" className="text-4xl mb-4" />
                  <h3 className="text-2xl font-bold mb-4">No Video Available</h3>
                  <p className="text-gray-700">
                    We are working on adding a video to our about us page.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-20 bg-[#F5F6F9]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={itemVariants}>
              <Badge className="bg-[#5685CE] text-white">Our Mission</Badge>
              <h2 className="text-4xl font-bold text-gray-900">
                Transforming Education for the Digital Age
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that education should be accessible, engaging, and
                effective. Our platform combines cutting-edge technology with
                proven teaching methodologies to create an unparalleled learning
                experience.
              </p>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-[#5685CE] rounded-full"></div>
                  <span className="text-gray-700">
                    Personalized learning paths
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-[#5685CE] rounded-full"></div>
                  <span className="text-gray-700">Expert-led instruction</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-[#5685CE] rounded-full"></div>
                  <span className="text-gray-700">
                    Interactive learning tools
                  </span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="relative" variants={itemVariants}>
              <div className="bg-[#5685CE] rounded-2xl p-8 text-white">
                <Icon icon="tabler:bulb" className="text-4xl mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-white/90 leading-relaxed">
                  To become the leading platform that democratizes quality
                  education, making it available to students regardless of their
                  location or background.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#5685ce6b] rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <Badge className="bg-[#5685CE] text-white mb-4">Our Values</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape everything we do and guide us in our mission
              to provide exceptional educational experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <Card
                  className={`${value.color} border-2 hover:shadow-lg transition-all duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-[#5685CE] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon icon={value.icon} className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-main relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#5685CE] to-[#3c629d]"></div>
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          variants={itemVariants}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
          variants={itemVariants}
        ></motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Ready to Start Your Learning Journey?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-white/90 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of students who have already transformed their lives
            through our innovative educational platform.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to={token ? "/teachers" : "/login"}>
              <Button
                size="lg"
                className="bg-white text-[#5685CE] hover:bg-white/90"
              >
                <Icon
                  icon={token ? "tabler:school" : "tabler:user-plus"}
                  className="mr-2"
                />
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:border-main/10"
              >
                <Icon icon="tabler:phone" className="mr-2" />
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </LayoutWithVerification>
  );
};

export default AboutUs;
