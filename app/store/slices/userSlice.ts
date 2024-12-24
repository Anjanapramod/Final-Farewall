import { StandardResponse } from "@/app/helpers/types/response.type";
import { User } from "@/app/helpers/types/user.type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

enum ACTIONS {
  LOGIN = "user/login",
  LOGOUT = "user/logout",
  REGISTER = "user/register",
  GET_USER = "user/getUser",
}

interface UserState {
  user: User | null;
  error: string | null;
}

const initialState: UserState = {
  user: {
    id: 5,
    name: "",
    email: "",
    role: "",
  },
  error: null,
};

// USER LOGIN
export const postLogin = createAsyncThunk(
  ACTIONS.LOGIN,
  async (data: User, { rejectWithValue }) => {
    try {
      console.log("LOGIN API CALL");
      const response = await axios.post("/api/users/login", data);
      const k: StandardResponse = response.data as StandardResponse;
      if (k.code === 200) {
        console.log(k);
        const user = k.data as User;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", JSON.stringify(user.role));
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

// USER REGISTER
export const postRegister = createAsyncThunk(
  ACTIONS.REGISTER,
  async (data: User, { rejectWithValue }) => {
    try {
      console.log("REGISTER API CALL");
      const response = await axios.post("/api/users/register", data);
      const k: StandardResponse = response.data as StandardResponse;

      if (k.code == 201) {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN CASES
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.user = action.payload as User;
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log("User logged in:", state.user);
      state.error = null;
    });

    builder.addCase(postLogin.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // REGISTRATION CASES
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.user = action.payload as User;
      console.log("User registered:", state.user);
      state.error = null;
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      console.log("REJECTSD");
      console.log(action.payload);
      state.error = action.payload as string;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
