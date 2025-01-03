/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Booking } from "@/app/helpers/types/booking.type";
import { StandardResponse } from "@/app/helpers/types/response.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

enum ACTIONS {
  SAVE = "booking/save",
  GET_ALL = "booking/get",
  DELETE = "booking/delete",
  FIND_BY_ID = "booking/findById",
  FIND_BY_USER_ID = "booking/findByUserId",
  FIND_BY_PARLOR_ID = "booking/findByParlorId",
  UPDATE = "booking/update",
}

interface BookingState {
  bookings: Booking[] | null;
  error: string | null;
  message: string | null;
  isSucess: boolean;
}

const initialState: BookingState = {
  bookings: null,
  error: null,
  message: null,
  isSucess: false,
};

export const saveBooking = createAsyncThunk(
  ACTIONS.SAVE,
  async (bookingDetail: Booking, { rejectWithValue }) => {
    try {
      console.log("---------------------------------------------------");
      console.log("SAVE BOOKING API CALL");
      console.log("---------------------------------------------------");
      console.log(bookingDetail);
      const response = await axios.post("/api/bookings", { ...bookingDetail });
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData.data);
      if (responseData.code === 201) {
        console.log("Booking Added Successfully");
        return responseData.data;
      } else {
        console.log(responseData);
        return rejectWithValue(responseData.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllBookings = createAsyncThunk(
  ACTIONS.GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      console.log("---------------------------------------------------");
      console.log("GET ALL BOOKING API CALL");
      console.log("---------------------------------------------------");

      const response = await axios.get(`/api/bookings`);
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData.data);
      if (responseData.code === 200) {
        console.log("Booking Fetched Successfully");
        return responseData.data;
      } else {
        console.log(responseData);
        return rejectWithValue(responseData.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllBookingsByUserId = createAsyncThunk(
  ACTIONS.FIND_BY_USER_ID,
  async (userId: number, { rejectWithValue }) => {
    try {
      console.log("---------------------------------------------------");
      console.log("GET ALL BOOKING BY USER ID API CALL");
      console.log("---------------------------------------------------");
      const response = await axios.get(`/api/bookings`, {
        params: {
          userId,
        },
      });
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData.data);
      if (responseData.code === 200) {
        console.log("Booking Fetched Successfully");
        return responseData.data;
      } else {
        console.log(responseData);
        return rejectWithValue(responseData.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllBookingsByParlorId = createAsyncThunk(
  ACTIONS.FIND_BY_PARLOR_ID,
  async (parlorId: number, { rejectWithValue }) => {
    try {
      console.log("---------------------------------------------------");
      console.log("GET ALL BOOKING BY PARLOR ID API CALL");
      console.log("---------------------------------------------------");
      const response = await axios.get(`/api/bookings`, {
        params: {
          parlorId,
        },
      });
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData.data);
      if (responseData.code === 200) {
        console.log("Booking Fetched Successfully");
        return responseData.data;
      } else {
        console.log(responseData);
        return rejectWithValue(responseData.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async (
    { bookingId, status }: { bookingId: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("---------------------------------------------------");
      console.log("UPDATE STATUS");
      console.log(bookingId, status);
      console.log("---------------------------------------------------");

      // send data in body
      const response = await axios.put(`/api/bookings`, {
        id: bookingId,
        status: status,
      });
      const responseData: StandardResponse = response.data as StandardResponse;
      if (responseData.code === 200) {
        return responseData.data;
      } else {
        return rejectWithValue(responseData.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //save booking
    builder.addCase(saveBooking.fulfilled, (state) => {
      state.isSucess = true;
    });
    builder.addCase(saveBooking.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isSucess = false;
    });

    //get all bookings
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.bookings = action.payload as Booking[];
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //get all bookings by user id
    builder.addCase(getAllBookingsByUserId.fulfilled, (state, action) => {
      state.bookings = action.payload as Booking[];
    });
    builder.addCase(getAllBookingsByUserId.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //get all bookings by parlor id
    builder.addCase(getAllBookingsByParlorId.fulfilled, (state, action) => {
      state.bookings = action.payload as Booking[];
    });
    builder.addCase(getAllBookingsByParlorId.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //update booking status
    builder.addCase(updateBookingStatus.fulfilled, (state) => {
      state.isSucess = true;
    });
    builder.addCase(updateBookingStatus.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isSucess = false;
    });
  },
});

export default bookingSlice.reducer;
