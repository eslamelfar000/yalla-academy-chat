import { useState, useEffect } from "react";
import ResponsiveCalendar from "./ResponsiveCalendar";
import SessionCalender from "./SessionCalender";
import { useDispatch } from "react-redux";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";

const HandleCalendarShow = ({
  currentStep,
  loading,
  showModal,
  setShowModal,
  teacherId,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {currentStep === "sessionCalendar" &&
        (isMobile ? (
          <ResponsiveCalendar
            loading={loading}
            showModal={showModal}
            setShowModal={setShowModal}
            teacherId={teacherId}
          />
        ) : (
          <SessionCalender
            loading={loading}
            showModal={showModal}
            setShowModal={setShowModal}
            teacherId={teacherId}
          />
        ))}
    </>
  );
};

export default HandleCalendarShow;
