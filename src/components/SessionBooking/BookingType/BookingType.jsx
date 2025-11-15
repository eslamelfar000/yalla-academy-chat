import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";
import { useTeacherPricing } from "../../../hooks/useTeacherData";
import { useUserData } from "@/hooks/useUserData";

function BookingType() {
  const { id } = useParams();
  const { teacherData, isLoading } = useTeacherPricing(id);
  const booking = useSelector((state) => state.booking?.booking);

  const [selectedBeforeNum, setSelectedBeforeNum] = useState(1);
  const [selectedAfterNum, setSelectedAfterNum] = useState(1);
  // Initialize selected state from Redux booking state
  const [selected, setSelected] = useState(booking?.bookingType || "free");
  const { currentUserData } = useUserData();

  const dispatch = useDispatch();

  // Sync selected state with Redux booking state
  useEffect(() => {
    if (booking?.bookingType) {
      setSelected(booking.bookingType);
    }
  }, [booking?.bookingType]);

  useEffect(() => {
    dispatch(
      updateBooking({
        lessons: 1,
      })
    );
  }, [selected]);

  // Set default trail selection when teacher data loads (only if user hasn't used trial)
  useEffect(() => {
    if (teacherData && !isLoading && !currentUserData?.has_trail_session) {
      setSelected("free"); // Set visual selection
      dispatch(
        updateBooking({
          bookingType: "free",
          name: "Free Trail Lesson",
          price: 0,
          totalPrice: 0,
          lessons: 1,
          teacherId: id,
          teacherName: teacherData?.name,
          type: "trail",
        })
      );
    } else if (
      teacherData &&
      !isLoading &&
      currentUserData?.has_trail_session
    ) {
      // If user has used trial, set default to "before" option
      setSelected("before");
      dispatch(
        updateBooking({
          bookingType: "before",
          name: "Pay Before Sessions",
          price: teacherData?.package_before_price,
          totalPrice: teacherData?.package_before_price,
          lessons: 1,
          teacherId: id,
          teacherName: teacherData?.name,
          type: "paybefore",
        })
      );
    }
  }, [
    teacherData,
    isLoading,
    id,
    dispatch,
    currentUserData?.has_trail_session,
  ]);

  // Show loading state while fetching teacher data
  if (isLoading) {
    return (
      <div className="py-5">
        <div className="cover flex justify-center items-center">
          <div className="w-[90%] md:w-[70%] xl:w-[50%] mx-auto">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-gray-200 animate-pulse"
                >
                  <div className="w-48 h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-5"></div>
                  <div className="flex justify-between items-center">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-5 pb-20">
        <div className="cover flex justify-center items-center ">
          <div className="w-[90%] md:w-[70%] xl:w-[50%] mx-auto">
            <ul className="w-full p-0 m-0 pt-6">
              {!currentUserData?.has_trail_session && (
                <li
                  className="w-full"
                  onClick={() => {
                    setSelected("free"),
                      setSelectedAfterNum(1),
                      setSelectedBeforeNum(1),
                      dispatch(
                        updateBooking({
                          bookingType: "free",
                          name: "Free Trail Lesson",
                          price: 0,
                          totalPrice: 0,
                          lessons: 1,
                          teacherId: id,
                          teacherName: teacherData?.name,
                          type: "trail",
                        })
                      );
                  }}
                >
                  <div
                    className={`p-5 rounded-xl mb-10 w-full border-1 border-solid border-border transition-all duration-300 hover:bg-second cursor-pointer ${
                      selected === "free" && "bg-second border-main"
                    }`}
                  >
                    <h2 className="text-xl font-[600] text-left mb-3">
                      Free Trail Lesson
                    </h2>
                    <p className="text-sm opacity-70 mb-5">
                      You have a free lesson for trusting us in your learning
                      journey
                    </p>

                    <div className="hour flex justify-between items-center">
                      <p className="text-lg font-[500]">1 hour</p>
                      <p className="text-xl font-[600]">0 $</p>
                    </div>
                  </div>
                </li>
              )}

              <li
                className="w-full"
                onClick={() => {
                  setSelected("before"),
                    setSelectedAfterNum(1),
                    dispatch(
                      updateBooking({
                        bookingType: "before",
                        name: "Pay Before Sessions",
                        price: teacherData?.package_before_price,
                        totalPrice: teacherData?.package_before_price,
                        teacherId: id,
                        teacherName: teacherData?.name,
                        type: "paybefore",
                      })
                    );
                }}
              >
                <div
                  className={`p-5 rounded-xl mb-10 w-full border-1 border-solid border-border transition-all duration-300 hover:bg-second cursor-pointer ${
                    selected === "before" && "bg-second border-main"
                  }`}
                >
                  <h2 className="text-xl font-[600] text-left mb-3">
                    Pay Before Sessions
                  </h2>
                  <p className="text-sm opacity-70 mb-5">
                    Book more than 2 sessions and pay in advance before
                    attending
                  </p>

                  <div className="hour flex justify-between items-center">
                    <p className="text-lg font-[500]">1 hour</p>
                    <p className="text-xl font-[600] flex items-center gap-1">
                      <span> {teacherData?.package_before_price} $</span>
                      <span>(Session)</span>
                    </p>
                  </div>

                  {selected === "before" && (
                    <div className="lesson mt-5">
                      <p>How many lessons you want to book?</p>
                      <div className="flex justify-center">
                        <ul className="grid grid-cols-5 lg:flex justify-center gap-5 mt-4">
                          {Array.from({ length: 8 }, (_, i) => i + 1).map(
                            (num) => (
                              <li
                                key={num}
                                className={`text-sm p-2 text-center w-10 rounded-full border-1 border-solid border-main text-main ${
                                  selectedBeforeNum === num
                                    ? "bg-main text-white"
                                    : "bg-white"
                                }`}
                                onClick={() => {
                                  setSelectedBeforeNum(num),
                                    dispatch(
                                      updateBooking({
                                        lessons: num,
                                        totalPrice:
                                          teacherData?.package_before_price *
                                          num,
                                      })
                                    );
                                }}
                              >
                                {num}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>

              <li
                className="w-full"
                onClick={() => {
                  setSelected("after"),
                    setSelectedBeforeNum(1),
                    dispatch(
                      updateBooking({
                        bookingType: "after",
                        name: "Pay After Sessions",
                        price: teacherData?.package_after_price, // Pay after is more expensive
                        totalPrice: teacherData?.package_after_price,
                        teacherId: id,
                        teacherName: teacherData?.name,
                        type: "payafter",
                      })
                    );
                }}
              >
                <div
                  className={`p-5 rounded-xl mb-10 w-full border-1 border-solid border-border transition-all duration-300 hover:bg-second cursor-pointer ${
                    selected === "after" && "bg-second border-main"
                  }`}
                >
                  <h2 className="text-xl font-[600] text-left mb-3">
                    Pay After Sessions
                  </h2>
                  <p className="text-sm opacity-70 mb-5">
                    Book 1 or 2 sessions now and pay after completing them
                  </p>

                  <div className="hour flex justify-between items-center">
                    <p className="text-lg font-[500]">1 hour</p>
                    <p className="text-xl font-[600] flex items-center gap-1">
                      <span> {teacherData?.package_after_price} $</span>
                      <span>(Session)</span>
                    </p>
                  </div>

                  {selected === "after" && (
                    <div className="lesson mt-5">
                      <p>How many lessons you want to book?</p>
                      <div className="flex justify-center">
                        <ul className="grid grid-cols-2 md:flex justify-center gap-5 mt-4">
                          {Array.from({ length: 2 }, (_, i) => i + 1)
                            .map((num) => (
                              <li
                                key={num}
                                className={`text-sm p-2 text-center w-10 rounded-full border-1 border-solid border-main text-main ${
                                  selectedAfterNum === num
                                    ? "bg-main text-white"
                                    : "bg-white"
                                }`}
                                onClick={() => {
                                  setSelectedAfterNum(num),
                                    dispatch(
                                      updateBooking({
                                        lessons: num,
                                        totalPrice:
                                          teacherData?.package_after_price *
                                          num,
                                      })
                                    );
                                }}
                              >
                                {num}
                              </li>
                            ))
                            .slice(0, 2)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingType;
