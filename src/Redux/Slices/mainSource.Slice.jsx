import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";

// Async Thunk to fetch main source data
export const fetchMainSource = createAsyncThunk("fetchMainSource", async () => {
  const { data } = await privateRoute.get("/api/mainSource");
  console.log("mainSource slice fetched data:", data);
  return data;
});

export const createOrUpdateMainSource = createAsyncThunk(
  "createOrUpdateMainSource",
  async (formData) => {
    try {
      console.log("formdata", formData);
      const { data } = await privateRoute.post("/api/mainSource", formData);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in main source controller:", error);
      toast.error(error.message);
    }
  }
);
export const deleteMainSource = createAsyncThunk("deleteMainSource", async (id) => {
  try {
    const { data } = await privateRoute.delete(`/api/mainSource/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
});

// Redux Slice for main source
export const mainSourceSlice = createSlice({
  name: "mainSource",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMainSource.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMainSource.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("mainSource fulfilled:", action.payload);
      state.data = action.payload.data;
    });
    builder.addCase(fetchMainSource.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default mainSourceSlice.reducer;
