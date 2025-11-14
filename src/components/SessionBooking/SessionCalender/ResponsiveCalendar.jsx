import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calendar.css";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../../AlertModal/AlertModal";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";
import TimeLine from "../Controller/TimeLine";
import { toast } from "sonner";
import { useAvailableSessions } from "../../../hooks/useAvailableSessions";
import LoaderPage from "../../LoaderPage/LoaderPage";

function ResponsiveCalendar({ loading, showModal, setShowModal, teacherId }) {
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const [selectedDay, setSelectedDay] = useState(new Date());
  const existingEventDate = useSelector((state) => state.booking.booking.eventDate) || [];
  const [selectedEvents, setSelectedEvents] = useState(existingEventDate);
  const lessonNumber = useSelector((state) => state.booking.booking.lessons); // Get lesson number from Redux store

  // Sync selectedEvents with Redux when component remounts or existingEventDate changes externally
  useEffect(() => {
    // Only sync if Redux has data and local state is empty, or if they're out of sync
    if (existingEventDate && existingEventDate.length > 0 && selectedEvents.length === 0) {
      setSelectedEvents(existingEventDate);
    }
  }, [existingEventDate]); // Sync when Redux value changes

  // Fetch available sessions
  const {
    data: availableSessionsData,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useAvailableSessions(teacherId);

  // Transform API data to FullCalendar format
  const events =
    availableSessionsData?.map((session) => ({
      id: session.id.toString(),
      title:
        session.coaching === 1 || session.is_booked === true
          ? "Booked Session"
          : "Available Session",
      start: `${session.day}T${session.start_time}`,
      end: `${session.day}T${session.end_time}`,
      extendedProps: {
        status:
          session.coaching === 1 || session.is_booked === true
            ? "booked"
            : "available",
        coaching: session.coaching,
        is_booked: session.is_booked,
      },
    })) || [];

  const handleSelect = (day) => {
    if (day) {
      setSelectedDay(day); // Only update if a new day is selected
    }
  };

  // Initialize selectedEvents from Redux store when component mounts
  useEffect(() => {
    if (existingEventDate && existingEventDate.length > 0) {
      setSelectedEvents(existingEventDate);
    }
  }, []); // Only run on mount

  const handleDeleteMobileEvent = (eventId) => {
    const updatedEvents = selectedEvents.filter((e) => e.id !== eventId);
    setSelectedEvents(updatedEvents);
    dispatch(updateBooking({ eventDate: updatedEvents }));
  };

  const handleSelectEvent = (event) => {
    // Prevent selecting booked sessions
    if (event.extendedProps.status === "booked") {
      // toast.error("Session Already Booked", {
      //   description:
      //     "This session has already been booked and is not available",
      //   duration: 5000,
      //   action: {
      //     label: "close",
      //   },
      // });
      return;
    }

    const isSelected = selectedEvents.some((e) => e.id === event.id);

    if (isSelected) {
      // Deselect the event
      handleDeleteMobileEvent(event.id);
    } else if (selectedEvents.length < lessonNumber) {
      // Select event if within the limit
      setSelectedEvents([...selectedEvents, event]);
    } else {
      // setShowModal(true); // Show modal if limit is reached
      toast.error("Selection Limit Reached", {
        description: `You can only select ${lessonNumber} lessons`,
        duration: 5000,

        action: {
          label: "close",
        },
      });
    }
  };

  useEffect(() => {
    if (selectedEvents.length > 0) {
      dispatch(updateBooking({ eventDate: selectedEvents }));
    } else {
      dispatch(updateBooking({ eventDate: [] })); // Reset if no events are selected
    }
  }, [selectedEvents, dispatch]);

  // Show loading state while fetching sessions
  if (sessionsLoading) {
    return <LoaderPage />;
  }

  // Show error state if sessions fetch failed
  if (sessionsError) {
    return (
      <div className="cover block md:hidden">
        <div className="text-center p-4">
          <p className="text-red-500">Failed to load available sessions</p>
        </div>
      </div>
    );
  }

  const filteredEvents = events?.filter((event) => {
    if (!event?.start && !event?.end) return false;

    const eventDate = new Date(event?.start);
    const selectedDate =
      selectedDay instanceof Date ? selectedDay : new Date(selectedDay);

    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear() // Ensure the same year
    );
  });

  // console.log(Events);

  return (
    <>
      <div className="cover block md:hidden">
        <div className="call flex justify-center items-center border-b-1 border-solid border-second-dark rounded-lg">
          <DayPicker
            animate
            mode="single"
            disabled={[
              { before: new Date() }, // Disable all past days (today is selectable)
            ]}
            selected={selectedDay}
            onSelect={handleSelect}
          />
        </div>
        <div className="time flex justify-center items-center">
          <div className="relative grid text-[12px] place-content-center grid-cols-2 sm:grid-cols-3 gap-2 mt-5 w-[95%] md:w-[90%] lg:w-[70%] xl:w-[50%]">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const isSelected = selectedEvents.some(
                  (e) => e.id === event.id
                );
                const isBooked = event.extendedProps.status === "booked";

                return (
                  <div
                    key={event.id}
                    onClick={() => handleSelectEvent(event)}
                    className={`border border-solid rounded-lg p-2 transition-all duration-200 ${
                      isBooked
                        ? "border-gray-400 bg-gray-200 cursor-not-allowed opacity-60"
                        : isSelected
                        ? "bg-main text-white border-main cursor-pointer"
                        : "border-border hover:border-main cursor-pointer"
                    }`}
                  >
                    <div className="w-full font-[400] flex gap-1 items-center justify-center select-none">
                      <span className="text-center">
                        {new Date(event.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="mx-1">-</span>
                      <span>
                        {new Date(event.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {isBooked && (
                      <div className="text-xs text-gray-500 text-center mt-1">
                        Booked
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="cover mb-20">
                <p className="absolute w-full mt-10 text-center text-sm font-[400] bg-second-dark p-2 rounded-lg text-main">
                  No Lessons found for this day
                </p>
              </div>
            )}
          </div>
        </div>
        <TimeLine handleDeleteMobileEvent={handleDeleteMobileEvent} />
      </div>
    </>
  );
}

export default ResponsiveCalendar;
