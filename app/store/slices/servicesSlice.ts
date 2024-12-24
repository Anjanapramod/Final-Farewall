"use client";
import { StandardResponse } from "@/app/helpers/types/response.type";
import { Service } from "@/app/helpers/types/service.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

enum ACTIONS {
  SAVE = "service/save",
  GET = "service/get",
  GET_ALL_BY_PARLOR_ID = "service/getAllByParlorId",
  DELETE = "service/delete",
  FIND_BY_ID = "service/findById",
  UPDATE = "service/update",
}

interface ServiceState {
  services: Service[] | null;
  service: Service | null;
  error: string | null;
  message: string | null;
  isSucess: boolean;
}

const initialState: ServiceState = {
  services: null,
  service: null,
  error: null,
  message: null,
  isSucess: false,
};

// Service GET ALL by parlor id
export const getAllByParlorId = createAsyncThunk(
  ACTIONS.GET_ALL_BY_PARLOR_ID,
  async (funeralParlorId: number, { rejectWithValue }) => {
    try {
      console.log("GET API CALL");
      const response = await axios.get("/api/site-services", {
        params: {
          funeralParlorId,
        },
      });

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

// Service SAVE
export const saveService = createAsyncThunk(
  ACTIONS.SAVE,
  async (data: Service, { rejectWithValue }) => {
    try {
      console.log("SAVE API CALL");
      console.log(data);
      const response = await axios.post("/api/site-services", { ...data });

      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData);
      if (responseData.code === 201) {
        console.log("SAVE API CALL SUCCESS");

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

// DELETE SERVICE
export const deleteService = createAsyncThunk(
  ACTIONS.DELETE,
  async (id: number, { rejectWithValue }) => {
    try {
      console.log("DELETE API CALL");
      const response = await axios.delete("/api/site-services/manage", {
        params: {
          id,
        },
      });

      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData);
      if (responseData.code === 200) {
        console.log("DELETE API CALL SUCCESS");

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

// UPDATE SERVICE
export const updateService = createAsyncThunk(
  ACTIONS.UPDATE,
  async (data: Service, { rejectWithValue }) => {
    try {
      console.log("UPDATE API CALL");
      console.log(data);
      const response = await axios.put("/api/site-services/manage", {
        ...data,
      });

      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData);
      if (responseData.code === 200) {
        console.log("UPDATE API CALL SUCCESS");
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

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all by funeral parlor id
    builder.addCase(getAllByParlorId.fulfilled, (state, action) => {
      console.log("GET ALL BY PARLOR ID API CALL FUlFILLED");
      state.services = action.payload as Service[];
      state.error = null;
      state.message = "Services fetched successfully";
      state.isSucess = true;
    });
    builder.addCase(getAllByParlorId.rejected, (state, action) => {
      console.log("GET ALL BY PARLOR ID API CALL REJECTED");
      state.services = null;
      state.error = action.payload as string;
      state.message = "Failed to fetch services";
      state.isSucess = false;
    });

    //save service
    builder.addCase(saveService.fulfilled, (state, action) => {
      console.log("SAVE API CALL FUlFILLED");
      state.service = action.payload as Service;
      state.error = null;
      state.message = "Service saved successfully";
      state.isSucess = true;
    });
    builder.addCase(saveService.rejected, (state, action) => {
      console.log("SAVE API CALL REJECTED");
      state.service = null;
      state.error = action.payload as string;
      state.message = "Failed to save service";
      state.isSucess = false;
    });

    //delete service
    builder.addCase(deleteService.fulfilled, (state, action) => {
      console.log("DELETE API CALL FUlFILLED");
      state.service = action.payload as Service;
      state.error = null;
      state.message = "Service deleted successfully";
      state.isSucess = true;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      console.log("DELETE API CALL REJECTED");
      state.service = null;
      state.error = action.payload as string;
      state.message = "Failed to delete service";
      state.isSucess = false;
    });

    //update service
    builder.addCase(updateService.fulfilled, (state, action) => {
      console.log("UPDATE API CALL FUlFILLED");
      state.service = action.payload as Service;
      state.error = null;
      state.message = "Service updated successfully";
      state.isSucess = true;
    });
    builder.addCase(updateService.rejected, (state, action) => {
      console.log("UPDATE API CALL REJECTED");
      state.service = null;
      state.error = action.payload as string;
      state.message = "Failed to update service";
      state.isSucess = false;
    });
  },
});

export default serviceSlice.reducer;
