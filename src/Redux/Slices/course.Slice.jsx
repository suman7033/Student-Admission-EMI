import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateRoute } from "../../Configs/API";
import { toast } from "react-toastify";

// Async Thunk to fetch course data
export const fetchCourses = createAsyncThunk(
  "fetchCourses",
  async (category) => {
    const { data } = await privateRoute.get("/api/course",{
      params: {category},
    });
    console.log("course slice fetched data:", data);
    return data;
  }
);

// Controller function for creating or updating a course
export const createOrUpdateCourse = createAsyncThunk(
    "createOrUpdateCourse",
    async (formData) => {
      try {
        const { data } = await privateRoute.post("/api/course", formData);
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
  export const deleteCourse = createAsyncThunk("deleteMainSource", async (id) => {
    try {
      const { data } = await privateRoute.delete(`/api/course/${id}`);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  });

// Redux Slice for courses
export const courseSlice = createSlice({
  name: "course",
  initialState: {
    data: [], // Array of courses
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
    // Fetch courses
    builder.addCase(fetchCourses.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("Courses fetched:", action.payload);
      state.data = action.payload.data;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default courseSlice.reducer;
