import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";

export const fetchTeam = createAsyncThunk(
  "fetchTeam",
  async (userType) => {
    console.log("userType team request",userType);
    const { data } = await privateRoute.get("/api/team", {
      params: { userType },
    });
    console.log("team slice", data);
    return data;
  }
);

export const statusUpdate=createAsyncThunk(
  "statusUpdate",
  async(formData)=>{
    try{
      const {data} = await privateRoute.post("/api/team/status_update",formData);
      console.log("status response",data);

      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
      }
    }catch (error) {
      console.error("Error occurred in createOrUpdateTeamList", error);
      toast.error(error.message);
    }
  }
)
export const createOrUpdateTeamList = createAsyncThunk(
  "createOrUpdateTeamList",
  async (formData) => {
    try {
      const { data } = await privateRoute.post("/api/team", formData);
      console.log("API Response:", data);

      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred in createOrUpdateTeamList", error);
      toast.error(error.message);
    }
  }
);
export const teamSlice = createSlice({
  name: "team",
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
    builder.addCase(fetchTeam.pending, (state, action) => {
      (state.isLoading = true), (state.error = null);
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      (state.isLoading = false), console.log("slice", action.payload.data);
      state.data = action.payload.data;
    });
    builder.addCase(fetchTeam.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    });
  },
});

export default teamSlice.reducer;
