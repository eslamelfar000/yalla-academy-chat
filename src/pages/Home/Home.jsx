import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HomeCards from "../../components/HomeCard/HomeCards";
import HomeTeachers from "../../components/HomeTeachers/HomeTeachers";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";
import TrialLessonDialog from "../../components/TrialLessonDialog/TrialLessonDialog";
import { useGetData } from "@/hooks/useGetData";
import { useUserDataContext } from "../../context/UserDataContext";

function Home() {
  const { data, isLoading, isError } = useGetData({
    endpoint: "home-api",
    queryKey: ["homeData"],
  });

  const homeData = data?.data;
  const { userData, isAuthenticated } = useUserDataContext();
  const [showTrialDialog, setShowTrialDialog] = useState(false);

  console.log(userData?.has_trail_session);

  // Check for trial session availability after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has trial session available
      if (isAuthenticated) {
        if (userData?.has_trail_session) {
          return;
        } else {
          setShowTrialDialog(true);
        }
      }else{
        setShowTrialDialog(true);
      }
    }, 2000); // Show dialog after 2 seconds of page load

    return () => clearTimeout(timer);
  }, [userData]);

  const handleCloseTrialDialog = () => {
    setShowTrialDialog(false);
  };

  return (
    <LayoutWithVerification>
      <Navbar />
      <Hero />
      <HomeCards />
      <Banner />
      <HomeTeachers teachers={homeData?.teachers} isLoading={isLoading} />
      <HomeSlider reviews={homeData?.reviews} isLoading={isLoading} />
      <Footer />

      {/* Trial Lesson Dialog */}
      <TrialLessonDialog
        isOpen={showTrialDialog}
        onClose={handleCloseTrialDialog}
      />
    </LayoutWithVerification>
  );
}

export default Home;
