import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TeacherInfo from "../../components/TeacherPageComponents/TeacherInfo/TeacherInfo";
import TeacherVideo from "../../components/TeacherPageComponents/TeacherVideo/TeacherVideo";
import AddComment from "../../components/TeacherPageComponents/AddComment/AddComment";
import ShowReviews from "../../components/TeacherPageComponents/Reviews/ShowReviews";
import TeacherInfoSkeleton from "../../components/TeacherPageComponents/TeacherInfoSkeleton";
import TeacherVideoSkeleton from "../../components/TeacherPageComponents/TeacherVideoSkeleton";
import ReviewsSkeleton from "../../components/TeacherPageComponents/ReviewsSkeleton";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";
import { useTeacherData } from "../../hooks/useTeacherData";

function TeacherPage() {
  const { id } = useParams();

  const {
    data: teacherData,
    isLoading,
    error,
  } = useTeacherData(id || "default");

  // Handle error state
  if (error) {
    return (
      <LayoutWithVerification>
        <Navbar />
        <div className="bg-second min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">
              {error?.response?.data?.message ||
                error?.message ||
                "Failed to load teacher"}
            </div>
            <div className="text-gray-600 text-sm mb-4">
              Status: {error?.response?.status || "Unknown"}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="btn bg-main text-white hover:bg-main-dark"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer custom={true} />
      </LayoutWithVerification>
    );
  }

  return (
    <LayoutWithVerification>
      <Navbar />
      <div className="bg-second">
        <div className="lg:hidden p-5">
          <div className="p-5 bg-white rounded-md shadow-lg">
            {isLoading ? (
              <TeacherInfoSkeleton />
            ) : (
              <TeacherInfo teacher={teacherData?.data || teacherData} />
            )}
          </div>
        </div>
        <div className="p-5 xl:w-[80%] flex flex-col-reverse lg:flex-row justify-between mx-auto gap-5">
          <div className="left flex-2 bg-white p-5 rounded-md shadow-lg">
            <div className="cover lg:flex hidden">
              {isLoading ? (
                <TeacherInfoSkeleton />
              ) : (
                <TeacherInfo teacher={teacherData?.data || teacherData} />
              )}
            </div>
            {isLoading ? (
              <ReviewsSkeleton />
            ) : (
              <ShowReviews teacher={teacherData?.data} />
            )}
          </div>

          <div className="right flex-1 rounded-md">
            {isLoading ? (
              <TeacherVideoSkeleton />
            ) : (
              <TeacherVideo teacher={teacherData?.data} />
            )}
            <AddComment teacherId={id} />
          </div>
        </div>
      </div>
      <Footer custom={true} />
    </LayoutWithVerification>
  );
}

export default TeacherPage;
