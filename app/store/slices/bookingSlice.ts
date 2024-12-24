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
            console.log("---------------------------------------------------")

            console.log("SAVE BOOKING API CALL");
            console.log("---------------------------------------------------")
            console.log(bookingDetail);
            const response = await axios.post("/api/bookings",{...bookingDetail});
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
    },

});

export default bookingSlice.reducer;