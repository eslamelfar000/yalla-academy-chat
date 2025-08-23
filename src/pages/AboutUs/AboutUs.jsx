import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";
import { Link } from "react-router-dom";
import useAuthToken from "@/hooks/use-auth-token";

const AboutUs = () => {
  const { getToken } = useAuthToken();
  const token = getToken();
  const stats = [
    { number: "500+", label: "Students Enrolled", icon: "tabler:users" },
    { number: "50+", label: "Expert Teachers", icon: "tabler:graduation-cap" },
    { number: "95%", label: "Success Rate", icon: "tabler:trophy" },
    { number: "24/7", label: "Support Available", icon: "tabler:headphones" },
  ];

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

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      description:
        "Education expert with 15+ years of experience in online learning platforms.",
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      description:
        "Tech innovator passionate about creating seamless learning experiences.",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Educator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      description:
        "Dedicated teacher with expertise in modern pedagogical approaches.",
    },
  ];

  return (
    <LayoutWithVerification>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-main-dark"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          {/* <Badge className="mb-6 bg-white/20 text-white border-white/30">
            About Our Platform
          </Badge> */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Empowering Students
            <span className="block text-4xl md:text-5xl font-light mt-2">
              Through Quality Education
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            We're on a mission to make quality education accessible to everyone,
            connecting students with expert teachers worldwide.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-[#5685CE] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={stat.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#5685CE] mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F5F6F9]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
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
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#5685CE] rounded-full"></div>
                  <span className="text-gray-700">
                    Personalized learning paths
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#5685CE] rounded-full"></div>
                  <span className="text-gray-700">Expert-led instruction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#5685CE] rounded-full"></div>
                  <span className="text-gray-700">
                    Interactive learning tools
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
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
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#5685CE] text-white mb-4">Our Values</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape everything we do and guide us in our mission
              to provide exceptional educational experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`${value.color} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-[#F5F6F9]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#5685CE] text-white mb-4">Our Team</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the Minds Behind Our Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of education experts and technology innovators
              work together to create the best learning experience for our
              students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-white/80">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">{member.description}</p>
                  <div className="flex space-x-3 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#5685CE] hover:border-main text-[#5685CE] hover:bg-[#5685CE] hover:text-white"
                    >
                      <Icon icon="tabler:brand-linkedin" className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#5685CE] hover:border-main text-[#5685CE] hover:bg-[#5685CE] hover:text-white"
                    >
                      <Icon icon="tabler:brand-twitter" className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-main relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5685CE] to-[#3c629d]"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their lives
            through our innovative educational platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={
                token
                  ? "/teachers"
                  : "/login"
              }
            >
              <Button
                size="lg"
                className="bg-white text-[#5685CE] hover:bg-white/90"
              >
                <Icon
                  icon={
                    token
                      ? "tabler:school"
                      : "tabler:user-plus"
                  }
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
          </div>
        </div>
      </section>

      <Footer />
    </LayoutWithVerification>
  );
};

export default AboutUs;
