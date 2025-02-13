import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTextField from "../../Configs/CustomTextField";
import Navbar from "../Navbar/Navbar";
import { createOrUpdateAccount } from "../../Redux/Slices/account.Slice";

const AddAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.accountSlice.data);

  const initialState = location?.state
    ? {
        _id: location.state?._id || "",
        bankName: location.state?.bankName || "",
        accountNo: location.state?.accountNo || "",
        branch: location.state?.branch || "",
        IFSCCode: location.state?.IFSCCode || "",
        accountHolderName: location.state?.accountHolderName || "",
        percentage: location.state?.percentage || "",
        mobileNo: location.state?.mobileNo || "",
        address: location.state?.address || "",
        createdBy: user?._id || "",
      }
    : {
        bankName: "",
        accountNo: "",
        branch: "",
        IFSCCode: "",
        accountHolderName: "",
        percentage: "",
        mobileNo: "",
        address: "",
        createdBy: user?._id || "",
      };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location?.state) {
      setFormData(initialState); // Reset form data when location state changes
    }
  }, [location?.state, user]);

  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};
  
    // Validate Bank Name
    if (!formData.bankName.trim()) {
      validationErrors.bankName = "Bank name is required";
      isValid = false;
    }
  
    // Validate Branch Name
    if (!formData.branch.trim()) {
      validationErrors.branch = "Branch name is required";
      isValid = false;
    }
  
    // Validate Account Number
    if (!formData.accountNo.trim()) {
      validationErrors.accountNo = "Account number is required";
      isValid = false;
    } else if (!/^\d{9,18}$/.test(formData.accountNo)) {
      validationErrors.accountNo = "Account number must be 9 to 18 digits";
      isValid = false;
    }
  
    // Validate IFSC Code
    if (!formData.IFSCCode.trim()) {
      validationErrors.IFSCCode = "IFSC code is required";
      isValid = false;
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSCCode)) {
      validationErrors.IFSCCode = "Invalid IFSC code format";
      isValid = false;
    }
  
    // Validate Mobile Number
    if (!formData.mobileNo.trim()) {
      validationErrors.mobileNo = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      validationErrors.mobileNo = "Mobile number must be 10 digits";
      isValid = false;
    }
  
    // Validate Account Holder Name
    if (!formData.accountHolderName.trim()) {
      validationErrors.accountHolderName = "Account holder name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.accountHolderName)) {
      validationErrors.accountHolderName = "Account holder name must contain only letters and spaces";
      isValid = false;
    }
  
    // Validate Percentage
    if (!formData.percentage.trim()) {
      validationErrors.percentage = "Percentage is required";
      isValid = false;
    } else if (isNaN(formData.percentage) || formData.percentage <= 0 || formData.percentage > 100) {
      validationErrors.percentage = "Percentage must be a number between 1 and 100";
      isValid = false;
    }
  
    // Validate Address
    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
      isValid = false;
    } else if (formData.address.length < 10) {
      validationErrors.address = "Address must be at least 10 characters long";
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

    const createData = { ...formData, createdBy: user?._id };
    try {
      const resultAction = await dispatch(createOrUpdateAccount(createData));
      if (createOrUpdateAccount.fulfilled.match(resultAction)) {
        navigate("/account_list");
      } else {
        createOrUpdateAccount.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.error(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updateData = { ...formData, createdBy: user?._id };
    try {
      const resultAction = await dispatch(createOrUpdateAccount(updateData));
      if (createOrUpdateAccount.fulfilled.match(resultAction)) {
        navigate("/account_list");
      } else {
        createOrUpdateAccount.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };
  return (
    <>
      <Navbar title={`${location?.state ? "Update" : "Create"} Course`} />
      <div className="p-2 md:p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.bankName}
                value={formData.bankName}
                variant="outlined"
                label="Enter Bank Name"
                autoComplete="false"
                name='bankName'
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.bankName ? "border-red-500" : ""
                }`}
                type="text"
              ></CustomTextField>
              {errors.bankName && (
                <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
              )}
            </div>

            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.branch}
                variant="outlined"
                name="branch"
                autoComplete="false"
                label="Enter Account Branch"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.branch ? "border-red-500" : ""
                }`}
                type="text"
                value={formData.branch}
              ></CustomTextField>
              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
              )}
            </div>

            {/* Account */}
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.accountNo}
                value={formData.accountNo}
                variant="outlined"
                label="Enter Account No"
                autoComplete="false"
                name='accountNo'
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.accountNo ? "border-red-500" : ""
                }`}
                type="number"
              ></CustomTextField>
              {errors.accountNo && (
                <p className="text-red-500 text-sm mt-1">{errors.accountNo}</p>
              )}
            </div>
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.IFSCCode}
                value={formData.IFSCCode}
                variant="outlined"
                label="Enter IFSC Code"
                autoComplete="false"
                name='IFSCCode'
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.IFSCCode ? "border-red-500" : ""
                }`}
                type="text"
              ></CustomTextField>
              {errors.IFSCCode && (
                <p className="text-red-500 text-sm mt-1">{errors.IFSCCode}</p>
              )}
            </div>
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.accountHolderName}
                value={formData.accountHolderName}
                variant="outlined"
                label="Account Holder Name"
                autoComplete="false"
                name='accountHolderName'
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.accountHolderName ? "border-red-500" : ""
                }`}
                type="text"
              ></CustomTextField>
              {errors.accountHolderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.accountHolderName}
                </p>
              )}
            </div>
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.percentage}
                value={formData.percentage}
                variant="outlined"
                label="Enter Percentage"
                name="percentage"
                autoComplete="false"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.percentage ? "border-red-500" : ""
                }`}
                type="text"
              ></CustomTextField>
              {errors.percentage && (
                <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>
              )}
            </div>
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.mobileNo}
                value={formData.mobileNo}
                variant="outlined"
                label="Enter Mobile No."
                autoComplete="false"
                name="mobileNo"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.mobileNo ? "border-red-500" : ""
                }`}
                type="number"
              ></CustomTextField>
              {errors.mobileNo && (
                <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
              )}
            </div>
            <div className="form-group">
              <CustomTextField
                onChange={handleChange}
                isInvalid={!!errors.address}
                value={formData.address}
                variant="outlined"
                label="Enter Address"
                className={`bg-[#faf7f7] md:w-64 ${
                  errors.address ? "border-red-500" : ""
                }`}
                autoComplete="false"
                name='address'
                type="text"
              ></CustomTextField>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <div className=" flex text-white justify-end mt-4 gap-4">
            <Link to="/account_list">
              <button className="bg-[#929ca8] py-1.5 text-white px-8 rounded-md">
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

export default AddAccount;
