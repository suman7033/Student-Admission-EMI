import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";
// Async Thunk to fetch mail data
export const fetchMails = createAsyncThunk(
  "fetchMails",
  async () => {
    const { data } = await privateRoute.get("/api/mail");
    console.log("Mail slice fetched data:", data);
    return data;
  }
);

// Controller function for creating or updating a mail item
export const createOrUpdateMail = createAsyncThunk(
  "createOrUpdateMail",
  async (formData) => {
    try {
      const { data } = await privateRoute.post("/api/mail", formData);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error occured in createOrUpdateMail", error);
      toast.error(error.message);
    }
  }
);
export const deleteMail = createAsyncThunk("deleteMail", async (id) => {
  try {
    const { data } = await privateRoute.delete(`/api/mail/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
});
// Redux Slice for mail
export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    data: [], // Array of mails
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
    // Fetch mails
    builder.addCase(fetchMails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMails.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("Mails fetched:", action.payload);
      state.data = action.payload.data;
    });
    builder.addCase(fetchMails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default mailSlice.reducer;
