import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: {
    bookingType: "",
    name: "",
    price: 0,
    totalPrice: 0,
    currency: "ILS",
    lessons: 1,
    eventDate: [],
    teacherId: null,
    teacherName: "",
    sessionIds: [],
    paymentType: null,
    type: null,
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateBooking: (state, action) => {
      // Calculate total price when lessons or price changes
      const updatedBooking = { ...state.booking, ...action.payload };

      if (updatedBooking.price && updatedBooking.lessons) {
        updatedBooking.totalPrice =
          updatedBooking.price * updatedBooking.lessons;
      }

      state.booking = updatedBooking;
    },
    clearBooking: (state) => {
      state.booking = initialState.booking;
    },
  },
});

// Export actions
export const { updateBooking, clearBooking } = bookingSlice.actions;

// Export reducer
export default bookingSlice.reducer;
