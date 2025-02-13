import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";

// Async Thunk to fetch admission data
export const fetchAdmissions = createAsyncThunk(
  "admission/fetchAdmissions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateRoute.get("/api/admission");
      console.log("Admission slice fetched data:", data);
      return data;
    } catch (error) {
      console.error("Error occurred in fetchAdmissions", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admissions!"
      );
    }
  }
);

// Controller function for creating or updating an admission
export const createOrUpdateAdmission = createAsyncThunk(
  "admission/createOrUpdateAdmission",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await privateRoute.post("/api/admission", formData);
      console.log("Admission API Response:", data);

      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.error("Error occurred in createOrUpdateAdmission", error);
      toast.error(error.response?.data?.message || "An error occurred!");
      return rejectWithValue(
        error.response?.data?.message || "Failed to create or update admission!"
      );
    }
  }
);

// Controller function for updating admission status
export const updateStatus = createAsyncThunk(
  "admission/updateStatus",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Status request data:", formData);
      const { data } = await privateRoute.put(
        "/api/admission/status",
        formData
      );
      console.log("Status API Response:", data);

      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.error("Error occurred in updateStatus", error);
      toast.error(error.response?.data?.message || "Failed to update status!");
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status!"
      );
    }
  }
);

// Redux Slice for admission
export const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    data: [], // Array of admission records
    isLoading: false,
    error: null,
    totalAdmission: "",
    pending: "",
    approved: "",
    rejected: "",
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
    // Handle fetchAdmissions
    builder
      .addCase(fetchAdmissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdmissions.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Admissions fetched:", action.payload.totalCount);
        state.data = action.payload.data;
        state.totalAdmission = action.payload.totalCount;
        state.pending = action.payload.pendingCount;
        state.approved = action.payload.approvedCount;
        state.rejected = action.payload.rejectCount;
      })
      .addCase(fetchAdmissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle createOrUpdateAdmission
    builder
      .addCase(createOrUpdateAdmission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrUpdateAdmission.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Admission created/updated successfully!");
      })
      .addCase(createOrUpdateAdmission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle updateStatus
    builder
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Status updated successfully!");
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default admissionSlice.reducer;
