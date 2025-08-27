import React, { useEffect, useState } from "react";
import BackButton from "../StepsButtons/BackButton";
import NextButton from "../StepsButtons/NextButton";
import { useDispatch, useSelector } from "react-redux";
import { RiAlarmFill } from "react-icons/ri";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";

function Control({ activeLoading, setShowModal }) {
  const booking = useSelector((state) => state.booking?.booking);
  const currentStep = useSelector((state) => state.step.currentStep);
  const user_data = JSON.parse(localStorage.getItem("yall_user_data"));

  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  useEffect(() => {
    if (currentStep === "bookingType") {
      dispatch(updateBooking({ eventDate: [] })); // Dispatch immediately with correct data
    }
  }, [currentStep]);

  // console.log(booking);

  return (
    <>
      <div className="bottom p-5 lg:px-30 sticky bottom-0 w-full bg-second z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="back flex justify-start  w-full sm:w-auto items-center gap-3 mb-5 sm:mb-0">
            <div className="cover flex items-center gap-3">
              {currentStep !== "bookingType" && window.innerWidth >= 768 && (
                <BackButton selected={booking?.bookingType} />
              )}
              <div className="img overflow-hidden rounded-full w-10 h-10">
                <img
                  className="w-full h-full object-cover object-top"
                  src={
                    user_data?.image ===
                    "https://indigo-ferret-819035.hostingersite.com/"
                      ? "https://randomuser.me/api/portraits/men/2.jpg"
                      : user_data?.image
                  }
                  alt=""
                />
              </div>
            </div>

            <p className="text-md font-[400] py-1 px-3 text-sm border-1 border-solid border-border rounded-lg flex gap-1 opacity-70 items-center">
              <span>
                {booking?.bookingType === "free"
                  ? "Free Trail Lesson"
                  : booking?.bookingType === "before"
                  ? "Pay Before Sessions"
                  : "Pay After Sessions"}
              </span>
              {booking?.bookingType !== "free" && (
                <>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <span>{booking?.lessons}</span>
                    <span>{booking?.lessons > 1 ? "Lessons" : "Lesson"}</span>
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="next flex justify-between sm:justify-end items-center gap-5 w-full sm:w-auto">
            <div className="price">
              <p className="text-3xl font-[600]">
                {booking?.totalPrice || booking?.price} $
              </p>
            </div>

            <div className="btns flex items-center gap-3 scale-95 sm:scale-100">
              {currentStep !== "bookingType" && window.innerWidth < 768 && (
                <BackButton selected={booking?.bookingType} />
              )}
              <NextButton
                selected={booking?.bookingType}
                activeLoading={activeLoading}
                setShowModal={setShowModal}
                block={
                  currentStep === "sessionCalendar"
                    ? booking?.eventDate?.length === 0 ||
                      (booking?.eventDate?.length !== booking?.lessons && true)
                    : false
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Control;
