import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";

// Async Thunk to fetch account data
export const fetchAccounts = createAsyncThunk(
  "fetchAccounts",
  async () => {
    const { data } = await privateRoute.get("/api/account");
    console.log("account slice fetched data:", data);
    return data;
  }
);

export const createOrUpdateAccount = createAsyncThunk(
    "createOrUpdateAccount",
    async (formData) => {
      try {
        const { data } = await privateRoute.post("/api/account", formData);
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log("Error occured in createOrUpdateAccount", error);
        toast.error(error.message);
      }
    }
  );
  export const deleteAccount = createAsyncThunk("deleteAccount", async (id) => {
    try {
      const { data } = await privateRoute.delete(`/api/account/${id}`);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  });

// Redux Slice for accounts
export const accountSlice = createSlice({
  name: "account",
  initialState: {
    data: [], // Array of accounts
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
    // Fetch accounts
    builder.addCase(fetchAccounts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("Accounts fetched:", action.payload);
      state.data = action.payload.data;
    });
    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default accountSlice.reducer;
