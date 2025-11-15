import React, { useEffect, useState } from "react";
import BookingType from "./BookingType/BookingType";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setStep } from "../../Store/Reducer/stepSlice";
import { updateBooking } from "../../Store/Reducer/bookingSlice";
import Control from "./Controller/Control";
import Steps from "./Controller/Steps";
import HandleCalendarShow from "./SessionCalender/HandleCalendarShow";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useTeacherPricing } from "../../hooks/useTeacherData";
import { useUserData } from "../../hooks/useUserData";

function Page({ teacherId }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
  const booking = useSelector((state) => state.booking?.booking);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("error");
  const { teacherData, isLoading: teacherLoading } =
    useTeacherPricing(teacherId);
  const { currentUserData } = useUserData();

  // Check if on calendar step and booking type is empty, redirect to booking type
  useEffect(() => {
    if (
      currentStep === "sessionCalendar" &&
      (!booking?.bookingType || booking?.bookingType === "" || !booking?.type)
    ) {
      // Redirect back to booking type selection
      dispatch(setStep("bookingType"));

      // Set default booking type if teacher data is available
      if (teacherData && !teacherLoading) {
        if (!currentUserData?.has_trail_session) {
          // Set default to free trial if user hasn't used it
          dispatch(
            updateBooking({
              bookingType: "free",
              name: "Free Trail Lesson",
              price: 0,
              totalPrice: 0,
              lessons: 1,
              teacherId: teacherId,
              teacherName: teacherData?.name,
              type: "trail",
            })
          );
        } else {
          // Set default to "before" option if user has used trial
          dispatch(
            updateBooking({
              bookingType: "before",
              name: "Pay Before Sessions",
              price: teacherData?.package_before_price,
              totalPrice: teacherData?.package_before_price,
              lessons: 1,
              teacherId: teacherId,
              teacherName: teacherData?.name,
              type: "paybefore",
            })
          );
        }
      }
    }
  }, [
    currentStep,
    booking?.bookingType,
    booking?.type,
    dispatch,
    teacherData,
    teacherLoading,
    teacherId,
    currentUserData?.has_trail_session,
  ]);

  return (
    <>
      {/* loadin */}
      {loading && <LoaderPage />}

      <Steps
        text={
          currentStep === "bookingType"
            ? "Select your booking type"
            : "Select your lessons"
        }
        activeStep={currentStep}
      />
      {currentStep === "bookingType" && <BookingType />}

      <HandleCalendarShow
        currentStep={currentStep}
        loading={loading}
        setShowModal={setShowModal}
        showModal={showModal}
        teacherId={teacherId}
      />
      <Control
        activeLoading={setLoading}
        setShowModal={setShowModal}
        setStatus={setStatus}
      />
    </>
  );
}

export default Page;
