import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTextField from '../../Configs/CustomTextField';
import { createOrUpdateMainSource } from '../../Redux/Slices/mainSource.Slice';
import Navbar from '../Navbar/Navbar';

const AddSourceForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const location = useLocation(); // To access location for state passed from previous page
  const { state } = location; // Destructure directly to get item
  const { isLoading } =useSelector((state)=>state.mainSourceSlice.data);
  const {user} = useSelector((state)=>state.auth) 

  console.log("location state", state);
      const initialState = location?.state
        ? {
            _id: location.state?._id,
            name: location.state?.name,
            description: location.state?.description,
            createdBy: user?._id,
          }
        : {
            name: "",
            description: "",
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
          errors.name = "Main Source Name is required";
          isValid = false;
        }
    
        if (!formData.description.trim()) {
          errors.description = "Description is required";
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
       console.log("foem data",formData)
       try{
        const resultAction=await dispatch(createOrUpdateMainSource(createData));
        if(createOrUpdateMainSource.fulfilled.match(resultAction)){
          navigate("/main_source");
        }else{
          createOrUpdateMainSource.rejected.match(resultAction);
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
        const resultAction=await dispatch(createOrUpdateMainSource(updateData));
        if(createOrUpdateMainSource.fulfilled.match(resultAction)){
          navigate("/main_source");
        }else{
          createOrUpdateMainSource.rejected.match(resultAction);
        }
      }catch(error){
        toast.error("An unexpected error occurred!");
        console.log(error);
      }
    };
  

  return (
    <>
    <Navbar
      title={`${location?.state ? "Update" : "Create"} Main Source`}
    />
    <div className='p-2 md:p-4'>
      <div className="bg-white p-3 md:p-5 rounded-lg shadow-md">
        {/* Form Fields */}
        <div className="flex flex-col gap-3 md:flex-row ">
        <div className="form-group">
          <CustomTextField
            onChange={handleChange}
            isInvalid={!!errors.name}
            value={formData.name}
            name='name'
            variant="outlined"
            autoComplete='false'
            label="Enter Source Name"
            className={`bg-[#faf7f7] md:w-64 ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          </div>

          <div className="form-group">
          <CustomTextField
            onChange={handleChange}
            isInvalid={!!errors.description}
            value={formData.description}
            variant="outlined"
            autoComplete='false'
            name='description'
            label="Enter Description"
            className={`bg-[#faf7f7] md:w-64 ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
          />
          {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex text-white justify-end gap-5 mt-4">
            <Link to="/main_source">
            <button className="bg-[#929ca8] text-white py-2 px-8 rounded-md">Back</button>
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

export default AddSourceForm;
