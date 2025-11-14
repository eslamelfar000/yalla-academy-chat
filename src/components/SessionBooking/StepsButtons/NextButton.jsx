import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../Store/Reducer/stepSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useMutate } from "../../../hooks/UseMutate";
import { clearBooking } from "../../../Store/Reducer/bookingSlice";
import { useBookingPersistence } from "../../../hooks/useBookingPersistence";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

function NextButton({ block, activeLoading, setShowModal }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
  const booking = useSelector((state) => state.booking?.booking);
  const navigate = useNavigate();
  const { clearBookingData } = useBookingPersistence();

  // Session booking mutation
  const sessionMutation = useMutate({
    method: "POST",
    endpoint: "session",
    text: "Session booked successfully!",
    toast: false,
    onSuccess: (data) => {
      activeLoading(false);

      // Check if this is PayPal payment with payment link
      if (booking.paymentType === "paypal" && data?.data?.payment_link) {
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
        navigate("/success", { replace: true });
        return;
      }

      // Store booking type for success page before clearing data
      const bookingType = booking.type;
      localStorage.setItem("last_booking_type", bookingType);

      // Clear booking data after storing the type
      clearBookingData();

      // Reset step to bookingType
      dispatch(setStep("bookingType"));

      // Different toast messages based on booking type
      if (booking.type === "payafter") {
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
        // Navigate to success page with replace to prevent back navigation
        navigate("/success", { replace: true });
      } else if (booking.type === "trail") {
        // For trial bookings, show success message and refresh the page
        toast.success("Your trial session booking is confirmed.", {
          description: "Your trial session has been successfully booked.",
          duration: 3000,
          style: {
            gap: "1rem",
          },
          icon: <CheckBadgeIcon className="size-8 text-green-500" />,
          action: {
            label: "close",
          },
        });
        // Refresh the page after a short delay to show the toast
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.success("Your trial session booking is confirmed.", {
          description: "Your trial session has been successfully booked.",
          duration: 15000,
          style: {
            gap: "1rem",
          },
          icon: <CheckBadgeIcon className="size-8 text-green-500" />,
          action: {
            label: "close",
          },
        });
        // Navigate to success page with replace to prevent back navigation
        navigate("/success", { replace: true });
      }
    },
    onError: (error) => {
      activeLoading(false);
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
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message, {
          duration: 5000,
          action: { label: "close" },
        });
      } else {
        toast.error("Failed to book session. Please try again.", {
          duration: 5000,
          action: { label: "close" },
        });
      }
    },
  });

  const handleSessionBooking = () => {
    if (!booking.teacherId) {
      toast.error("Teacher ID is required");
      return;
    }

    if (!booking.type) {
      toast.error("Booking type is required. Please select a booking type.");
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

    if (!sessionIds || sessionIds.length === 0) {
      toast.error("Invalid session selection. Please try again.");
      return;
    }

    const bookingData = {
      teacher_id: booking.teacherId,
      session_ids: sessionIds,
      type: booking.type,
      total_price: booking.totalPrice || booking.price,
      // Only include payment_type for non-trial and non-pay-after bookings
      ...(booking.type !== "trail" &&
        booking.type !== "payafter" && {
          payment_type: booking.paymentType,
        }),
    };

    activeLoading(true);
    sessionMutation.mutate(bookingData);
  };

  const handleNextStep = () => {
    if (currentStep === "bookingType") {
      dispatch(setStep("sessionCalendar"));
    } else if (currentStep === "sessionCalendar") {
      if (booking.type === "trail") {
        // For free trial, book directly
        handleSessionBooking();
      } else {
        // For paid sessions (including pay after), go to payment page
        navigate("/payment");
      }
    }
  };

  return (
    <>
      <button
        disabled={block}
        className={`btn text-white font-[600] bg-main py-2 px-5 rounded-xl shadow-none border-2 ${
          (booking?.eventDate?.length !== 0 &&
            booking?.lessons === booking?.eventDate?.length &&
            "border-main hover:border-main-dark") ||
          (currentStep === "bookingType" &&
            "border-main hover:border-main-dark")
        }  border-solid hover:bg-main-dark  transition-all duration-300 `}
        onClick={handleNextStep}
      >
        {currentStep === "sessionCalendar" && booking?.type === "trail"
          ? "Book Now"
          : "Next"}
      </button>
    </>
  );
}

export default NextButton;
