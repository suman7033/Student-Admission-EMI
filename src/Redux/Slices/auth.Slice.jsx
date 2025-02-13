import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { privateRoute } from "../../Configs/API";

// Async thunk for forgot password
export const forgot = createAsyncThunk(
  "auth/forgot",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await privateRoute.post("/api/forgot", email);
      console.log("api/forgot response", data);
      if (data.success) {
        toast.success(data.message || "Email sent successfully");
        return data;
      } else {
        toast.error(data.message || "An error occurred");
        return rejectWithValue(data);
      }
    } catch (error) {
      console.log(
        "Forgot error",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for password setup
export const password_setup = createAsyncThunk(
  "password_setup",
  async (password, { rejectWithValue }) => {
    console.log("password setup value",password);
    try {
      const { data } = await privateRoute.post("/api/password_setup", password);
      console.log("api/password_setup response", data);
      if (data.success) {
        toast.success("Password set successfully");
        return data;
      } else {
        toast.error("An error occurred");
        return rejectWithValue(data);
      }
    } catch (error) {
      console.log(
        "Password setup error",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    // user: "",
    isLoggedIn: !!localStorage.getItem("token"),
    isLoading: false,
    token: localStorage.getItem("token") || null,
    error: null,
    data: null,
  },
  reducers: {
    login: (state, action) => {
      console.log("Login slice data", action.payload.data);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Forgot fulfilled:", action.payload);
        state.data = action.payload;
      })
      .addCase(forgot.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Forgot rejected:", action.payload);
        state.error = action.payload;
      })
      .addCase(password_setup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(password_setup.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Password setup fulfilled:", action.payload);
        state.data = action.payload;
      })
      .addCase(password_setup.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Password setup rejected:", action.payload);
        state.error = action.payload;
      })
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
