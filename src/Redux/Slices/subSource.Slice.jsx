import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";

export const fetchSubSource = createAsyncThunk("fetchSubSource", async () => {
  const { data } = await privateRoute.get("/api/subSource");
  console.log("fetchSubSource", data);
  return data;
});

export const createOrUpdateSubSource = createAsyncThunk(
  "createOrUpdateSubSource",
  async (formData) => {
    try {
      const { data } = await privateRoute.post("/api/subSource", formData);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error occured in createOrUpdateBranch", error);
      toast.error(error.message);
    }
  }
);
export const deleteSubSource = createAsyncThunk("deleteMainSource", async (id) => {
  try {
    const { data } = await privateRoute.delete(`/api/subSource/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
});

export const subSourceSlice = createSlice({
  name: "subSource",
  initialState: {
    data: [], // Array of sub-sources
    isLoading: false,
    isSuccess: false,
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
    // Fetch sub-sources
    builder.addCase(fetchSubSource.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSubSource.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data; // Assign the array directly
    });
    builder.addCase(fetchSubSource.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message; // Assign error message
    });
  },
});

export default subSourceSlice.reducer;
