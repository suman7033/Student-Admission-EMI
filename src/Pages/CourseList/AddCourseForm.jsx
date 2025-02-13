import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTextField from '../../Configs/CustomTextField';
import { createOrUpdateCourse } from '../../Redux/Slices/course.Slice';
import Navbar from '../Navbar/Navbar';

const AddCourseForm = () => {
  const dispatch=useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation(); // To access location for state passed from previous page
  const { isLoading } = useSelector((state) => state.subSourceSlice.data); // Loading state
  const { state } = location; // Destructure directly to get item

  console.log("location state", state);
    const initialState = location?.state
      ? {
          _id: location.state?._id,
          name: location.state?.name,
          price: location.state?.price,
          createdBy: user?._id,
        }
      : {
          name: "",
          price: "",
          createdBy: user?._id || "",
        };
  
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      if (location?.state) {
        setFormData(initialState); // Reset form data when selectedItem changes
      }
    }, [location?.state, user]);
    // Form validation
    const validateForm = () => {
      let isValid = true;
      const errors = {};
  
      if (!formData.name.trim()) {
        errors.name = "Course Name is required";
        isValid = false;
      }
  
      if (!formData.price.trim()) {
        errors.price = "Price is required";
        isValid = false;
      }
  
      setErrors(errors);
      return isValid;
    };
  
 const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value,
     }));
 
     setErrors((prev) => ({
       ...prev,
       [name]: "",
     }));
   };
 
   const handleCreate = async (e) => {
     e.preventDefault();
     if (!validateForm()) return;
 
     const createData = { ...formData };
     createData.createdBy = user?._id;
     try{
      const resultAction=await dispatch(createOrUpdateCourse(createData));
      if(createOrUpdateCourse.fulfilled.match(resultAction)){
        navigate("/course_list");
      }else{
        createOrUpdateCourse.rejected.match(resultAction);
      }
    }catch(error){
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const updateData = { ...formData, createdBy: user?._id };
    try{
      const resultAction=await dispatch(createOrUpdateCourse(updateData));
      if(createOrUpdateCourse.fulfilled.match(resultAction)){
        navigate("/course_list");
      }else{
        createOrUpdateCourse.rejected.match(resultAction);
      }
    }catch(error){
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  return (
    <>
    <Navbar
      title={`${location?.state ? "Update" : "Create"} Course`}
    />
    <div className="p-2 md:p-4">
        <div className="bg-white p-3 md:p-5 rounded-lg shadow-md">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.name}
                name="name"
                variant="outlined"
                autoComplete="false"
                label="Enter Course Name"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.name ? "border-red-500" : ""
                }`}
                type="text"
                value={formData.name}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.price}
                name="price"
                variant="outlined"
                autoComplete="false"
                label="Enter Price Name"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.price ? "border-red-500" : ""
                }`}
                type="number"
                value={formData.price}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          
          </div>

          <div className="flex text-white justify-end gap-5 mt-4">
            <Link to="/course_list">
              <button className="bg-[#929ca8] text-white py-2 px-8 rounded-md">
                Back
              </button>
            </Link>
            <button
              className="bg-[#637D9B] rounded-md px-8 py-1.5"
              disabled={isLoading}
              onClick={location?.state? handleUpdate : handleCreate}
            >
              {isLoading ? (
                <BeatLoader size={10} color="#ffffff" />
              ) : location?.state? (
                "Update"
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
