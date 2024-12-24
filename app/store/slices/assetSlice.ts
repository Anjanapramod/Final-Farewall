"use client";

import { Asset } from "@/app/helpers/types/asset.type";
import { StandardResponse } from "@/app/helpers/types/response.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

enum ACTIONS {
  SAVE = "asset/save",
  GET_ALL = "asset/get",
  DELETE = "asset/delete",
  FIND_BY_ID = "asset/findById",
  FIND_BY_FUNERAL_PARLOR_ID = "asset/findByFuneralParlorId",
  UPDATE = "asset/update",
}

interface AssetState {
  assets: Asset[] | null;
  asset: Asset | null;
  error: string | null;
  message: string | null;
  isSucess: boolean;
}

const initialState: AssetState = {
  assets: null,
  asset: null,
  error: null,
  message: null,
  isSucess: false,
};

// ASSET GET BY FUNERAL PARLOR ID
export const getAssetByFuneralParlorId = createAsyncThunk(
  ACTIONS.FIND_BY_FUNERAL_PARLOR_ID,
  async (funeralParlorId: number, { rejectWithValue }) => {
    try {
      console.log("GET BY FUNERAL PARLOR ID API CALL");
      const response = await axios.get("/api/site-assets", {
        params: { funeralParlorId },
      });
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData.data);
      if (responseData.code === 200) {
        console.log("GET BY FUNERAL PARLOR ID API CALL SUCCESS");
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

// ASSET GET ALL
export const getAllAsset = createAsyncThunk(
  ACTIONS.GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      console.log("GET API CALL");
      const response = await axios.get("/api/site-assets");
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

// ASSET SAVE
export const postAsset = createAsyncThunk(
  ACTIONS.SAVE,
  async (data: Asset, { rejectWithValue }) => {
    try {
      console.log("SAVE API CALL");
      const response = await axios.post("/api/site-assets", data);
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

// DELETE by id
export const deleteById = createAsyncThunk(
  ACTIONS.DELETE,
  async (id: number, { rejectWithValue }) => {
    try {
      console.log("SAVE API CALL");
      const response = await axios.delete("/api/site-assets/manage", {
        params: { id },
      });
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData);
      if (responseData.code === 200) {
        console.log("DELETE ASSET SUCCESS");
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

// UPDATE
export const updateAsset = createAsyncThunk(
  ACTIONS.UPDATE,
  async (data: Asset, { rejectWithValue }) => {
    try {
      console.log("UPDATE API CALL");
      const response = await axios.put("/api/site-assets/manage", data);
      const responseData: StandardResponse = response.data as StandardResponse;
      console.log(responseData);
      if (responseData.code === 200) {
        console.log("UPDATE ASSET SUCCESS");
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

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL by FUNERAL PARLOR ID
    builder.addCase(getAssetByFuneralParlorId.fulfilled, (state, action) => {
      state.assets = action.payload as Asset[];
      state.error = null;
      state.isSucess = true;
    });
    builder.addCase(getAssetByFuneralParlorId.rejected, (state, action) => {
      state.error = action.payload as string;
      state.assets = null;
      state.isSucess = false;
    });

    // GET ALL
    builder.addCase(getAllAsset.fulfilled, (state, action) => {
      state.assets = action.payload as Asset[];
      state.error = null;
      state.isSucess = true;
    });
    builder.addCase(getAllAsset.rejected, (state, action) => {
      state.error = action.payload as string;
      state.assets = null;
      state.isSucess = false;
    });

    // SAVE
    builder.addCase(postAsset.fulfilled, (state, action) => {
      state.asset = action.payload as Asset;
      state.error = null;
      state.isSucess = true;
    });
    builder.addCase(postAsset.rejected, (state, action) => {
      state.error = action.payload as string;
      state.asset = null;
      state.isSucess = false;
    });

    // DELETE
    builder.addCase(deleteById.fulfilled, (state, action) => {
      state.asset = action.payload as Asset;
      state.error = null;
      state.isSucess = true;
    });

    builder.addCase(deleteById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.asset = null;
      state.isSucess = false;
    });

    // UPDATE
    builder.addCase(updateAsset.fulfilled, (state, action) => {
      state.asset = action.payload as Asset;
      state.error = null;
      state.isSucess = true;
    });
    builder.addCase(updateAsset.rejected, (state, action) => {
      state.error = action.payload as string;
      state.asset = null;
      state.isSucess = false;
    });
  },
});

export default assetSlice.reducer;
