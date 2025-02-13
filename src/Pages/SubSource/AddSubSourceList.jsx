import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTextField from "../../Configs/CustomTextField";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { createOrUpdateSubSource } from "../../Redux/Slices/subSource.Slice";

const AddSubSource = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // To access location for state passed from previous page
  const { isLoading } = useSelector((state) => state.subSourceSlice.data); // Loading state
  const { state } = location; // Destructure directly to get item

  console.log("location state", state);

  // Initial state for form
  const initialState = location?.state
    ? {
        _id: location.state?._id,
        name: location.state?.name,
        subDescription: location.state?.subDescription,
        createdBy: user?._id,
      }
    : {
        name: "",
        subDescription: "",
        createdBy: user?._id || "",
      };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location?.state?.state) {
      setFormData(initialState); // Reset form data when selectedItem changes
    }
  }, [location?.state?.state, user]);
  // Form validation
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Sub-Source Name is required";
      isValid = false;
    } else if (/[^a-zA-Z0-9 ]/.test(formData.name)) {
      errors.name = "Sub-Source Name must only contain letters and spaces";
      isValid = false;
    }

    if (!formData.subDescription.trim()) {
      errors.subDescription = "Description is required";
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
    try {
      const resultAction = await dispatch(createOrUpdateSubSource(createData));
      if (createOrUpdateSubSource.fulfilled.match(resultAction)) {
        navigate("/sub_source");
      } else {
        createOrUpdateSubSource.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updateData = { ...formData };
    updateData.createdBy = user?._id;
    try {
      const resultAction = await dispatch(createOrUpdateSubSource(updateData));
      if (createOrUpdateSubSource.fulfilled.match(resultAction)) {
        navigate("/sub_source");
      } else {
        createOrUpdateSubSource.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        title={`${location?.state ? "Update Source" : "Create"} Sub Source`}
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
                label="Enter Sub-Source Name"
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
                isInvalid={!!errors.subDescription}
                name="subDescription"
                variant="outlined"
                label="Enter Description"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.subDescription ? "border-red-500" : ""
                }`}
                type="text"
                value={formData.subDescription}
              />
              {errors.subDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subDescription}
                </p>
              )}
            </div>
          </div>

          <div className="flex text-white justify-end gap-5 mt-4">
            <Link to="/sub_source">
              <button className="bg-[#929ca8] text-white py-2 px-8 rounded-md">
                Back
              </button>
            </Link>
            <button
              className="bg-[#637D9B] rounded-md px-8 py-2"
              disabled={isLoading}
              onClick={location?.state ? handleUpdate : handleCreate}
            >
              {isLoading ? (
                <BeatLoader size={10} color="#ffffff" />
              ) : location?.state ? (
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

export default AddSubSource;
