import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API"; // Adjust the path if needed
import { toast } from "react-toastify";

// Async Thunk to fetch branch data
export const fetchBranches = createAsyncThunk(
  "fetchBranches",
  async () => {
    const { data } = await privateRoute.get("/api/branch");
    console.log("branch slice fetched data:", data);
    return data;
  }
);

// Async Thunk to create or update a branch item
export const createOrUpdateBranch = createAsyncThunk(
  "createOrUpdateBranch",
  
    async (formData)=>{
      try{
        const {data}=await privateRoute.post("/api/branch",formData);
          if(data.success){
            toast.success(data.message);
          }else{
            toast.error(data.message);
          }
      }catch(error){
        console.log("Error occured in createOrUpdateBranch",error);
        toast.error(error.message);
      }
  }
)
export const deleteBranch=createAsyncThunk("deleteBranch",async (id)=>{
  try {
      const {data}=await privateRoute.delete(`/api/branch/${id}`);
      if(data.success){
          toast.success(data.message)
      }else{
          toast.error(data.error)}
      
  } catch (error) {
      toast.error(error.message)
  }
})
// Redux Slice for branch
export const branchSlice = createSlice({
  name: "branch",
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
    builder.addCase(fetchBranches.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("branch fulfilled:", action.payload);
      state.data = action.payload.data;
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default branchSlice.reducer;
