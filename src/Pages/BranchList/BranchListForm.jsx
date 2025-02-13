import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTextField from "../../Configs/CustomTextField";
import Navbar from "../Navbar/Navbar";
import { createOrUpdateBranch } from "../../Redux/Slices/branch.Slice";

const BranchListForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To access location for state passed from previous page
  const { user } = useSelector((state) => state.auth);
  const { state } = location; // Destructure directly to get item

  const { isLoading } = useSelector((state) => state.subSourceSlice.data); // Loading state
  console.log("location state", state);

  const initialState = location?.state
    ? {
        _id: location.state?._id,
        name: location.state?.name,
        gstNo: location.state?.gstNo,
        createdBy: user?._id,
      }
    : {
        name: "",
        gstNo: "",
        createdBy: user?._id || "",
      };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location?.state) {
      setFormData(initialState); // Reset form data when selectedItem changes
    }
  }, [location?.state, user]);

  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Branch Name is required";
      isValid = false;
    }

    if (!formData.gstNo.trim()) {
      validationErrors.gstNo = "GSTNo is required";
      isValid = false;
    }

    setErrors(validationErrors);
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
      const resultAction = await dispatch(createOrUpdateBranch(createData));
      if (createOrUpdateBranch.fulfilled.match(resultAction)) {
        navigate("/branch_list");
      } else {
        createOrUpdateBranch.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updateData = { ...formData, createdBy: user?._id };
    try {
      const resultAction = await dispatch(createOrUpdateBranch(updateData));
      if (createOrUpdateBranch.fulfilled.match(resultAction)) {
        navigate("/branch_list");
      } else {
        createOrUpdateBranch.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };
  return (
    <>
      <Navbar title={`${location?.state ? "Update" : "Create"} Branch`} />
      <div className="p-2 md:p-4">
        <div className="bg-white p-3 md:p-5 rounded-lg shadow-md">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                // isInvalid={!!errors.name}
                value={formData.name}
                name="name"
                variant="outlined"
                label="Enter Branch Name"
                autoComplete="false"
                className='bg-[#faf7f7]'
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.gstNo}
                name="gstNo"
                variant="outlined"
                autoComplete="false"
                label="Enter GST No"
                className='bg-[#faf7f7]'
                type="text"
                value={formData.gstNo}
              />
              {errors.gstNo && (
                <p className="text-red-500 text-sm mt-1">{errors.gstNo}</p>
              )}
            </div>
          </div>
          <div className=" flex text-white justify-end mt-3 gap-3">
            <Link to="/branch_list">
              <button className="bg-[#929ca8] text-white py-1.5 px-8 rounded-md">
                Back
              </button>
            </Link>
            <button
              className="bg-[#637D9B] rounded-md px-8 py-1.5"
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

export default BranchListForm;
