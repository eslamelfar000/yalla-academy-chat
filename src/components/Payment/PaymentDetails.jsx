import React, { useState } from "react";
import man from "../../assets/man.png";
import { PiCircleFill } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useMutate } from "../../hooks/UseMutate";
import { clearBooking } from "../../Store/Reducer/bookingSlice";
import { useBookingPersistence } from "../../hooks/useBookingPersistence";
import { setStep } from "../../Store/Reducer/stepSlice";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { Button } from "../ui/button";
import { useCurrentUserData } from "../../hooks/useCurrentUserData";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

function PaymentDetails({ selectedPayment, payboxFile }) {
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearBookingData } = useBookingPersistence();
  const { userData: user } = useCurrentUserData();

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const booking = useSelector((state) => state.booking?.booking);

  // Check if this is a pay after booking
  const isPayAfter = booking?.type === "payafter";

  // Session booking mutation
  const sessionMutation = useMutate({
    method: "POST",
    endpoint: "session",
    text: "Session booked successfully!",
    toast: false,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (data) => {
      setIsLoading(false);

      // Check if this is PayPal payment with payment link
      if (
        (selectedPayment === "paypal" || selectedPayment === "cards") &&
        data?.data?.payment_link
      ) {
        // Redirect to PayPal payment link
        window.open(data.data.payment_link, "_blank");

        toast.warning("Redirecting to PayPal payment...", {
          description: "Please complete your payment in the new window.",
          duration: 5000,
          style: {
            gap: "1rem",
          },
          icon: <ExclamationTriangleIcon className="size-8 text-yellow-500" />,
          action: {
            label: "close",
          },
        });

        // Store booking type for success page before clearing data
        const bookingType = booking.type;
        localStorage.setItem("last_booking_type", bookingType);

        // Clear booking data after storing the type
        clearBookingData();

        // Reset step to bookingType
        dispatch(setStep("bookingType"));

        // Navigate to success page with replace to prevent back navigation
        navigate("/", { replace: true });
        return;
      }

      // Store booking type for success page before clearing data
      const bookingType = booking.type;
      localStorage.setItem("last_booking_type", bookingType);

      // Clear booking data after storing the type
      clearBookingData();

      // Reset step to bookingType
      dispatch(setStep("bookingType"));

      // Navigate to success page with replace to prevent back navigation
      navigate("/", { replace: true });

      // Different toast messages based on booking type
      if (isPayAfter) {
        toast.success("Your booking request is sent.", {
          description:
            "Payment will be collected after your last session. We will send payment details to your email.",
          duration: 15000,
          style: {
            gap: "1rem",
          },
          icon: <CheckBadgeIcon className="size-8 text-green-500" />,
          action: {
            label: "close",
          },
        });
      } else {
        toast.success("Your booking request is sent.", {
          description: "Note! your booking will be confirmed after 24h.",
          duration: 15000,
          style: {
            gap: "1rem",
          },
          icon: <CheckBadgeIcon className="size-8 text-green-500" />,
          action: {
            label: "close",
          },
        });
      }
    },
    onError: (error) => {
      setIsLoading(false);
      // Handle validation errors specifically
      if (error?.response?.data?.data) {
        const validationErrors = error.response.data.data;
        Object.keys(validationErrors).forEach((field) => {
          validationErrors[field].forEach((message) => {
            toast.error(message, {
              duration: 5000,
              action: { label: "close" },
            });
          });
        });
      }
    },
  });

  const handlePayment = () => {
    // For pay after bookings, don't require payment selection
    if (!isPayAfter && !selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    // For PayBox, check if file is uploaded
    if (selectedPayment === "paybox") {
      if (!payboxFile) {
        toast.error("Please upload your payment screenshot for PayBox");
        return;
      }
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (!booking.teacherId) {
      toast.error("Teacher ID is required");
      return;
    }

    if (!booking.eventDate || booking.eventDate.length === 0) {
      toast.error("Please select at least one session");
      return;
    }

    if (booking.eventDate.length !== booking.lessons) {
      toast.error(`Please select exactly ${booking.lessons} session(s)`);
      return;
    }

    // Prepare session IDs from selected events
    const sessionIds = booking.eventDate.map((event) => event.id);

    const bookingData = {
      teacher_id: booking.teacherId,
      session_ids: sessionIds,
      type: booking.type,
      total_price: booking.totalPrice || booking.price,
      // Only include payment_type for non-pay-after bookings
      ...(isPayAfter ? {} : { payment_type: selectedPayment }),
    };

    // For PayBox, include the file in FormData
    if (selectedPayment === "paybox") {
      if (payboxFile && payboxFile instanceof File) {
        const formData = new FormData();

        // Handle session_ids as array properly
        formData.append("teacher_id", bookingData.teacher_id);
        formData.append("type", bookingData.type);
        formData.append("total_price", bookingData.total_price);
        formData.append("payment_type", bookingData.payment_type);

        // Append each session ID individually to maintain array structure
        bookingData.session_ids.forEach((sessionId) => {
          formData.append("session_ids[]", sessionId);
        });

        formData.append("file", payboxFile);

        setIsLoading(true);
        // Use FormData for PayBox payments
        sessionMutation.mutate(formData);
        return;
      } else {
        toast.error("Please upload your payment screenshot for PayBox");
        return;
      }
    }

    setIsLoading(true);
    sessionMutation.mutate(bookingData);
  };

  return (
    <>
      <div className="cover xl:flex-1 bg-second rounded-lg shadow-md lg:sticky top-20">
        <div className="info p-5 border-b border-border">
          <div className="user flex items-center mb-7">
            <figure className="img overflow-hidden  w-25 h-25 flex justify-center items-center rounded-full">
              <img src={user?.image} alt="" className="object-cover" />
            </figure>

            <div className="user-data opacity-50">
              <h2 className="font-bold text-md ml-3">
                {user?.name || "Teacher"}
              </h2>
              <p className="text-sm ml-5">
                60 min / {booking?.lessons} Lesson
                {booking?.lessons > 1 ? "s" : ""}
              </p>
              <p className="text-sm ml-5 mb-0">Zoom Meeting</p>
              <p className="text-sm ml-3 -mt-1">____________</p>
            </div>
          </div>

          <div className="lessons">
            <h3 className="text-md font-bold opacity-60 mb-2">
              {booking?.lessons > 1
                ? booking?.lessons + " " + "Lessons"
                : booking?.lessons + " " + "Lesson"}
            </h3>

            <ul className="flex flex-col gap-3">
              {booking?.eventDate?.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-2">
                    <PiCircleFill className="text-main w-3 h-3 inline-block" />
                    <p className="text-sm opacity-50 font-[400]">
                      {formatDate(item?.start)} -{" "}
                      {new Date(item?.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pay-details p-5">
          <div className="total flex justify-between items-center text-xl font-bold opacity-60 mx-5 pt-3 pb-10">
            <h1 className="text-2xl">Total Price</h1>
            <div className="price flex items-center gap-1 text-2xl">
              <h3>{booking?.totalPrice || booking?.price} $</h3>
            </div>
          </div>

          {isPayAfter && (
            <div className="pay-after-notice mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Pay After Booking:</strong> You will be charged after
                completing your last session. Payment details will be sent to
                your email.
              </p>
            </div>
          )}

          <div className="ok">
            <label className="fieldset-label mb-5 user-select-none flex items-center gap-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="checkbox text-main border-1 border-main checkbox-sm rounded-sm"
              />
              <span>
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-main underline"
                >
                  Terms and Conditions.
                </a>
              </span>
            </label>
            <Button
              disabled={
                (!isPayAfter && !selectedPayment) || !termsAccepted || isLoading
              }
              className={`w-full h-12 bg-main text-white rounded-lg hover:bg-main-dark`}
              onClick={handlePayment}
            >
              {isLoading ? (
                <BtnLoading text="Processing..." size="sm" />
              ) : isPayAfter ? (
                "Book Now (Pay Later)"
              ) : selectedPayment === "paybox" ? (
                "Approve Payment"
              ) : (
                <>
                  Pay {booking?.totalPrice || booking?.price}{" "}
                  {/* {booking?.currency} */}
                  $
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;
