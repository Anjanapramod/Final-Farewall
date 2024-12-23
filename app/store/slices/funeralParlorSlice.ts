"use client";

import { FuneralParlor } from "@/app/helpers/types/funeralParlor.type";
import { StandardResponse } from "@/app/helpers/types/response.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

enum ACTIONS {
    SAVE = "funeralParlor/save",
    GET = "funeralParlor/get",
    DELETE = "funeralParlor/delete",
    FIND_BY_ID = "funeralParlor/findById",
    FIND_BY_USER_ID = "funeralParlor/findByUserId",
    UPDATE = "funeralParlor/update",
}

interface FuneralParlorState {
    funeralParlors: FuneralParlor[] | null;
    funeralParlor: FuneralParlor | null;
    error: string | null;
    message: string | null;
    isSucess: boolean;
}

const initialState: FuneralParlorState = {
    funeralParlors: null,
    funeralParlor: null,
    error: null,
    message: null,
    isSucess: false,
};

// FUNERAL PARLOR GET ALL
export const getFuneralParlor = createAsyncThunk(
    ACTIONS.GET,
    async (_, { rejectWithValue }) => {
        try {
            console.log("GET API CALL");
            const response = await axios.get("/api/funeral-parlors");
            const responseData: StandardResponse = response.data as StandardResponse;
            console.log(responseData);
            if (responseData.code === 200) {
                console.log("GET API CALL SUCCESS");
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

// FUNERAL PARLOR SAVE
export const postFuneralParlor = createAsyncThunk(
    ACTIONS.SAVE,
    async (data: FuneralParlor, { rejectWithValue }) => {
        try {
            console.log("SAVE API CALL");
            console.log(data);
            const response = await axios.post("/api/funeral-parlors", data);
            const k: StandardResponse = response.data as StandardResponse;
            if (k.code === 201) {
                console.log(k);
                return k.data;
            } else {
                return rejectWithValue(k.message);
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "An unknown error occurred";
            return rejectWithValue(errorMessage);
        }
    }
);


// FIND BY USER ID
export const findFuneralParlorByUserId = createAsyncThunk(
    ACTIONS.FIND_BY_ID,
    async (userId: number, { rejectWithValue }) => {
        try {
            console.log("FIND BY USER ID API CALL");
            const response = await axios.get("/api/funeral-parlors/manage", { params: { userId } });
            const responseData: StandardResponse = response.data as StandardResponse;
            if (responseData.code === 200) {
                console.log("FIND BY USER ID API CALL SUCCESS: " + userId); 
                console.log(responseData.data);
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


// FIND BY PARLOR ID
export const findFuneralParlorById = createAsyncThunk(
    ACTIONS.FIND_BY_ID,
    async (id: number, { rejectWithValue }) => {
        try {
            console.log("FIND BY USER ID API CALL");
            const response = await axios.get("/api/funeral-parlors/manage", { params: { id } });
            const responseData: StandardResponse = response.data as StandardResponse;
            if (responseData.code === 200) {
                console.log("FIND BY USER ID API CALL SUCCESS");
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

// UPDATE PARLOR by id
export const updateFuneralParlor = createAsyncThunk(
    ACTIONS.UPDATE,
    async (data: FuneralParlor, { rejectWithValue }) => {
        try {
            console.log("SAVE API CALL");
            console.log(data);
            const response = await axios.put("/api/funeral-parlors/manage", data);
            const k: StandardResponse = response.data as StandardResponse;
            if (k.code === 200) {
                console.log(k);
                return k.data;
            } else {
                return rejectWithValue(k.message);
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "An unknown error occurred";
            return rejectWithValue(errorMessage);
        }
    }
);

const funeralParlorSlice = createSlice({
    name: "funeralParlor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GET ALL
        builder.addCase(getFuneralParlor.fulfilled, (state, action) => {
            console.log("Full filled");
            state.funeralParlors = action.payload as FuneralParlor[];
            state.error = null;
            state.message = "Funeral parlors fetched successfully";
        });
        builder.addCase(getFuneralParlor.rejected, (state, action) => {
            console.log("Get All Rejected");
            state.error = action.payload as string;
        });


        // POST
        builder.addCase(postFuneralParlor.fulfilled, (state, action) => {
            console.log("Post Full filled");
            console.log(action.payload);
            console.log("--------------------------------------------------------------------------");
            state.funeralParlor = action.payload as FuneralParlor;
            state.error = null;
            state.message = "Funeral parlor saved successfully";
        });
        builder.addCase(postFuneralParlor.rejected, (state, action) => {
            console.log("Post Rejected");
            state.error = action.payload as string;

        });


        // find by user id 
        builder.addCase(findFuneralParlorByUserId.fulfilled, (state, action) => {
            console.log("Full filled");
            state.funeralParlor = action.payload as FuneralParlor;
            state.error = null;
            state.message = "Funeral parlors fetched successfully";
        });
        builder.addCase(findFuneralParlorByUserId.rejected, (state, action) => {
            console.log("Get All Rejected");
            state.error = action.payload as string;
            state.funeralParlor = null;
        });

        // UPDATE
        builder.addCase(updateFuneralParlor.fulfilled, (state, action) => {
            console.log("Post Full filled");
            console.log(action.payload);
            console.log("--------------------------------------------------------------------------");
            state.funeralParlor = action.payload as FuneralParlor;
            state.error = null;
            state.message = "Funeral parlor updated successfully";
        });
        builder.addCase(updateFuneralParlor.rejected, (state, action) => {
            console.log("Post Rejected");
            state.error = action.payload as string;
        });
    },
});

export default funeralParlorSlice.reducer;
