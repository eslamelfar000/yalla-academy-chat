import React, { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../../Store/Reducer/bookingSlice";
import TimeLine from "../Controller/TimeLine";
import AlertModal from "../../AlertModal/AlertModal";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { toast } from "sonner";
import { useAvailableSessions } from "../../../hooks/useAvailableSessions";

function SessionCalender({ loading, showModal, setShowModal, teacherId }) {
  const dispatch = useDispatch();
  const lessonNumber =
    useSelector((state) => state.booking.booking.lessons) || 0;
  const [selectedBooking, setSelectedBooking] = useState([]);

  console.log("Teacher ID:", setSelectedBooking);

  // Fetch available sessions
  const {
    data: availableSessionsData,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useAvailableSessions(teacherId);

  console.log("Available Sessions Data:", availableSessionsData);

  // Transform API data to FullCalendar format
  const events =
    availableSessionsData?.map((session) => ({
      id: session.id.toString(),
      title:
        session.coaching === true || session.is_booked === true
          ? "Booked Session"
          : "Available Session",
      start: `${session.day}T${session.start_time}`,
      end: `${session.day}T${session.end_time}`,
      extendedProps: {
        status:
          session.coaching === true || session.is_booked === true
            ? "booked"
            : "available",
        coaching: session.coaching,
        is_booked: session.is_booked,
      },
    })) || [];

  const isSlotAvailable = (start, end) => {
    return events.some(
      (event) =>
        new Date(event.start).getTime() === new Date(start).getTime() &&
        new Date(event.end).getTime() === new Date(end).getTime() &&
        event.extendedProps.status === "available" // Only allow selection of available sessions
    );
  };

  const handleDeleteWebEvent = (eventId) => {
    setSelectedBooking((prev) => prev.filter((e) => e.id !== eventId));
  };

  const handleEventClick = useCallback(
    (info) => {
      // Prevent clicking on booked sessions
      if (info.event.extendedProps.status === "booked") {
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

      setSelectedBooking((prev = []) => {
        const isAlreadySelected = prev.some(
          (event) => event.id === info.event.id
        );
        let updatedSelection = [...prev];

        if (isAlreadySelected) {
          updatedSelection = prev.filter((event) => event.id !== info.event.id);
          handleDeleteWebEvent(info.event.id);
        } else if (prev.length < lessonNumber) {
          updatedSelection = [
            ...prev,
            {
              id: info.event.id,
              title: info.event.title,
              start: info.event.start.toISOString(),
              end: info.event.end.toISOString(),
            },
          ];
        } else {
          // setShowModal(true);
          toast.error("Selection Limit Reached", {
            description: `You can only select ${lessonNumber} lessons`,
            duration: 5000,

            action: {
              label: "close",
            },
          });
          return prev;
        }

        setTimeout(() => {
          dispatch(updateBooking({ eventDate: updatedSelection || [] }));
        }, 0);

        return updatedSelection;
      });
    },
    [lessonNumber, dispatch]
  );

  useEffect(() => {
    dispatch(updateBooking({ eventDate: selectedBooking || [] }));
  }, [selectedBooking, dispatch]);

  // Show loading state while fetching sessions
  if (sessionsLoading) {
    return <LoaderPage />;
  }

  // Show error state if sessions fetch failed
  if (sessionsError) {
    return (
      <div className="cover hidden md:block pt-10">
        <div className="md:w-[90%] xl:w-[70%] mx-auto text-center">
          <p className="text-red-500">Failed to load available sessions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cover hidden md:block pt-10">
      <div className="md:w-[90%] xl:w-[70%] mx-auto">
        <div className="keys flex items-center gap-5 mb-5">
          <div className="flex items-center gap-2">
            <div className="open w-4 h-4 bg-[#4caf50] rounded-full"></div>
            <p className="text-sm font-[400]">Available</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="not w-4 h-4 bg-second border-1 border-solid border-second-dark rounded-full"></div>
            <p className="text-sm font-[400]">Not Available</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="booked w-4 h-4 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_1px,_#ccc_1px,_#eee_3px)] bg-gray-400 rounded-full"></div>
            <p className="text-sm font-[400]">Booked</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="selected w-4 h-4 bg-main rounded-full"></div>
            <p className="text-sm font-[400]">Booked by you</p>
          </div>
        </div>

        <FullCalendar
          dayCellClassNames={"day-cell"}
          slotLabelClassNames={"slot-label"}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{ right: "today prev next", left: "title" }}
          height={"auto"}
          allDaySlot={false}
          slotEventOverlap={false}
          dayHeaderClassNames={"day-header"}
          initialView="timeGridWeek"
          selectable={true}
          selectMirror={true}
          selectOverlap={false}
          selectAllow={(selectInfo) =>
            isSlotAvailable(selectInfo.startStr, selectInfo.endStr)
          }
          eventClick={handleEventClick}
          // slotMinTime="08:00:00"
          // slotMaxTime="22:30:00"
          slotDuration="01:00:00"
          slotLabelInterval="01:00:00"
          slotMinTime="09:00:00"
          slotMaxTime="26:00:00"
          slotLabelFormat={{ hour: "2-digit", minute: "2-digit" }}
          validRange={{ start: new Date() }}
          views={{ timeGridWeek: { type: "timeGrid", duration: { days: 7 } } }}
          events={events}
          eventClassNames={(eventInfo) => {
            const isSelected = selectedBooking.some(
              (event) => event.id === eventInfo.event.id
            );
            if (isSelected) return "selected-event";
            if (eventInfo.event.extendedProps.status === "booked")
              return "booked-event";
            return "open-event";
          }}
        />
      </div>
      <TimeLine handleDeleteWebEvent={handleDeleteWebEvent} />
    </div>
  );
}

export default SessionCalender;
