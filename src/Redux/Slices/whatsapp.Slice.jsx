import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";


// Async Thunk to fetch WhatsApp messages
export const fetchWhatsAppMessages = createAsyncThunk(
  "fetchWhatsAppMessages",
  async () => {
    const {data} = await privateRoute.get("/api/whatsapp");
    console.log("WhatsApp slice fetched data:", data);
    return data;
  }
);

// Controller function for creating or updating WhatsApp messages
export const createOrUpdateWhatsAppMessage = createAsyncThunk(
  "createOrUpdateWhatsAppMessage",
  async (formData) => {
    try {
      const { data } = await privateRoute.post("/api/whatsapp", formData);
      if (data.success) {
        toast.success(data.message);
        console.log("call slice1")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error occured in createOrUpdateWhatsAppMessage", error);
      toast.error(error.message);
    }
  }
);
export const deleteWhatsapp = createAsyncThunk("deleteWhatsapp", async (id) => {
  try {
    const { data } = await privateRoute.delete(`/api/whatsapp/${id}`);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
});

// Redux Slice for WhatsApp messages
export const whatsappSlice = createSlice({
  name: "whatsapp",
  initialState: {
    data: [], // Array of WhatsApp messages
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
    // Fetch messages
    builder.addCase(fetchWhatsAppMessages.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchWhatsAppMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("WhatsApp messages fetched:", action.payload);
      state.data = action.payload.data;
    });
    builder.addCase(fetchWhatsAppMessages.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

export default whatsappSlice.reducer;
