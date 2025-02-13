import React, { useEffect, useState } from "react";
import { FormGroup, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Checkbox } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTextField from "../../Configs/CustomTextField";
import {
  createOrUpdateTeamList,
  fetchTeam,
} from "../../Redux/Slices/team.Slice";
import Navbar from "../Navbar/Navbar";
import { fetchBranches } from "../../Redux/Slices/branch.Slice";
import LZString from "lz-string";

const AddNewUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const branches = useSelector((state) => state.branchSlice.data);
  const { user } = useSelector((state) => state.auth);
  const teamData = useSelector((state) => state.team.data);

  const { isLoading } = useSelector((state) => state.team.data);
  const [selectName, setSelectName] = useState("");
  const [UserIsOpen, setUserIsOpen] = useState(false);
  const [ManagerIsOpen, setManagerIsOpen] = useState(false);
  const [AdminIsOpen, setAdminIsOpen] = useState(false);
  const [permissionType, setPermissionType] = useState("");
  const [ProfilePic, setProfilePic] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [dropTeamList, setDropTeamList] = useState([]);
  let selectedList = "";
  if (location.state?.selected_list) {
    selectedList = teamData.find(
      (team) => team._id === location.state?.selected_list
    );
  }
  const navigate = useNavigate();

  const initialState = location?.state
    ? {
        _id: location.state?._id || "",
        name: location.state?.name || "",
        mobileNo: location.state?.mobileNo || "",
        altMobileNo: location.state?.altMobileNo || "",
        email: location.state?.email || "",
        gender: location.state?.gender || "",
        branch: location.state?.branch || "",
        designation: location.state?.designation || "",
        userPic: location.state?.userPic || "",
        menuPermission: location.state?.menuPermission || [],
        menuPermissionType: location.state?.menuPermissionType || "",
        userType: location.state?.userType || "",
        selected_list: selectedList.name || "",
        createdBy: user?._id || "",
      }
    : {
        name: "",
        mobileNo: "",
        altMobileNo: "",
        email: "",
        gender: "",
        branch: "",
        designation: "",
        menuPermission: [],
        menuPermissionType: "",
        userType: "",
        userPic: "",
        selected_list: "",
        password: "",
        createdBy: user?._id,
        status: true,
      };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location?.state) {
      setFormData(initialState); // Reset form data when location state changes
    }
    dispatch(fetchBranches());
    dispatch(fetchTeam());
    //  console.log("formData",formData.branch);
  }, [location?.state, user]);
  useEffect(() => {
    if (selectName === "User") {
      formData.menuPermission.push(
        "Dashboard",
        "Team List",
        "Mail List",
        "Admission List",
        "Branch List"
      );
    } else if (selectName === "Manager") {
      formData.menuPermission.push(
        "Dashboard",
        "Team List",
        "Mail List",
        "Admission List",
        "Branch List",
        "Whatsapp List",
        "Account List",
        "Mail List",
        "MainSource List"
      );
    } else {
      formData.menuPermission.push(
        "Dashboard",
        "Team List",
        "Mail List",
        "Admission List",
        "Branch List",
        "Whatsapp List",
        "Account List",
        "Mail List",
        "MainSource List"
      );
    }
    if (formData?.menuPermissionType) {
      SelectHandler(); // Call handler programmatically to set initial state
    }

    if (formData?.branch) {
      const matchedBranch = branches.find(
        (branch) => branch.name === formData.branch
      );
      toast.success(matchedBranch);

      if (matchedBranch) {
        setFormData((prev) => ({
          ...prev,
          branch: matchedBranch._id, // Set matched branch ID
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          branch: "",
        }));
      }
    }
    if (formData?.selected_list) {
      const matchSelected_List = teamData.find(
        (team) => team.name === formData.selected_list
      );
      toast.success(matchSelected_List);

      if (matchSelected_List) {
        setFormData((prev) => ({
          ...prev,
          selected_list: matchSelected_List._id,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          selected_list: "",
        }));
      }
    }
  }, []);

  const SelectHandler = (e) => {
    const val = e?.target?.value || formData?.menuPermissionType || ""; // Safely get value
    setSelectName(val);
    setFormData((prev) => ({ ...prev, menuPermissionType: val })); // Update formData
    setPermissionType(val); // Call your logic for setting permission type

    // Toggle permission-specific states
    if (val === "User") {
      setUserIsOpen(true);
      setManagerIsOpen(false);
      setAdminIsOpen(false);
    } else if (val === "Manager") {
      setManagerIsOpen(true);
      setUserIsOpen(false);
      setAdminIsOpen(false);
    } else if (val === "Admin") {
      setAdminIsOpen(true);
      setUserIsOpen(false);
      setManagerIsOpen(false);
    }
  };

  const getCheckBox = (e) => {
    const { value, checked } = e.target;
    let permissions = [...formData.menuPermission]; // Copying userPermissions array

    if (checked) {
      if (!permissions.includes(value)) {
        // Check if value is not already in permissions
        permissions.push(value); // Add value to permissions array
      }
    } else {
      permissions = permissions?.filter((item) => item !== value); // Remove value from permissions
    }

    setFormData({
      ...formData,
      menuPermission: permissions, // Update userPermissions in formData state
    });
    console.log("update permission", permissions);
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

  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      validationErrors.name = "Name must contain only letters and spaces";
      isValid = false;
    }

    // Validate Mobile Number
    if (!formData.mobileNo.trim()) {
      validationErrors.mobileNo = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      validationErrors.mobileNo = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

    // Validate Alternate Mobile Number
    if (!formData.altMobileNo.trim()) {
      validationErrors.altMobileNo = "AltMobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.altMobileNo)) {
      validationErrors.altMobileNo = "Enter a valid 10-digit altMobile number";
      isValid = false;
    }

    // Validate Email
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Validate Gender
    if (!formData.gender.trim()) {
      validationErrors.gender = "Gender is required";
      isValid = false;
    }

    // Validate Branch
    if (!formData.branch.trim()) {
      validationErrors.branch = "Branch is required";
      isValid = false;
    }

    // Validate Designation
    if (!formData.designation.trim()) {
      validationErrors.designation = "Designation is required";
      isValid = false;
    } else if (formData.designation.length < 3) {
      validationErrors.designation =
        "Designation must be at least 3 characters long";
      isValid = false;
    }

    // Validate User Picture
    if (!formData.userPic) {
      validationErrors.userPic = "Profile picture is required";
      isValid = false;
    }

    // Validate Menu Permission
    // if (!formData.menuPermission || formData.menuPermission === "") {
    //   validationErrors.menuPermission = "Menu permission is required";
    //   isValid = false;
    // }
    if (!selectName || selectName === "") {
      validationErrors.menuPermission = "Menu permission is required";
      isValid = false;
    }

    // Validate User Type
    if (!formData.userType.trim()) {
      validationErrors.userType = "User type is required";
      isValid = false;
    }

    // Validate Selected List
    if (!formData.selected_list.trim()) {
      validationErrors.selected_list = "Selected list is required";
      isValid = false;
    }

    setErrors(validationErrors);
    console.log("Validation errors: ", validationErrors);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || formData?.userPic;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the Base64 string for preview
        const base64String = reader.result.split(",")[1];
        setFormData((prevFormData) => ({
          ...prevFormData,
          userPic: base64String, // Set base64 image data to the formData
        }));
        setProfilePic(base64String); // Save the base64 string without the prefix
      };
      reader.readAsDataURL(file);
    }
  };
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const image = new Image();
  //       image.onload = () => {
  //         // Step 1: Resize the image using canvas
  //         const canvas = document.createElement("canvas");
  //         const context = canvas.getContext("2d");

  //         // Desired dimensions
  //         const maxWidth = 300; // Maximum width
  //         const maxHeight = 300; // Maximum height
  //         let width = image.width;
  //         let height = image.height;

  //         // Maintain aspect ratio
  //         if (width > maxWidth || height > maxHeight) {
  //           if (width > height) {
  //             height = (height * maxWidth) / width;
  //             width = maxWidth;
  //           } else {
  //             width = (width * maxHeight) / height;
  //             height = maxHeight;
  //           }
  //         }

  //         // Resize the canvas
  //         canvas.width = width;
  //         canvas.height = height;
  //         context.drawImage(image, 0, 0, width, height);

  //         // Step 2: Get the Base64 string
  //         const resizedBase64String = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality
  //         const base64String = resizedBase64String.split(",")[1]; // Get Base64 string without prefix

  //         // Step 3: Compress the Base64 string
  //         const compressedBase64 = LZString.compressToBase64(base64String);

  //         // Step 4: Update state
  //         console.log("Original Base64 Length:", base64String.length);
  //         console.log("Compressed Base64 Length:", compressedBase64.length);

  //         // Assuming you have these states
  //         setImagePreview(resizedBase64String); // For preview
  //         setFormData((prevFormData) => ({
  //           ...prevFormData,
  //           userPic: compressedBase64, // Compressed Base64 string
  //         }));
  //         setProfilePic(compressedBase64); // Save compressed Base64 string
  //       };
  //       image.src = reader.result; // Load the file as an image
  //     };
  //     reader.readAsDataURL(file); // Read the file
  //   }
  // };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("formData Request before api hit:", formData);
    try {
      const resultAction = await dispatch(createOrUpdateTeamList(formData));
      if (createOrUpdateTeamList.fulfilled.match(resultAction)) {
        navigate("/team_list");
      } else {
        toast.error("Failed to create/update team!");
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
      const resultAction = await dispatch(createOrUpdateTeamList(updateData));
      if (createOrUpdateTeamList.fulfilled.match(resultAction)) {
        navigate("/team_list");
      } else {
        toast.error("Failed to update team!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };
  console.log("drop in team list", dropTeamList);
  return (
    <>
      <Navbar title={`${location?.state ? "Update" : "Create"} Team`} />
      <div className="p-3">
        <ToastContainer />
        <div className="bg-white p-3 md:p-5 rounded-lg shadow-md">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.name}
                isInvalid={!!errors.name}
                variant="outlined"
                label="Enter Your Name"
                name="name"
                className="bg-[#faf7f7] w-64"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.mobileNo}
                isInvalid={!!errors.mobileNo}
                name="mobileNo"
                variant="outlined"
                label="Enter Mobile No."
                className="bg-[#faf7f7] w-64"
                type="number"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.altMobileNo}
                isInvalid={!!errors.altMobileNo}
                name="altMobileNo"
                variant="outlined"
                label="Enter Alt Mobile No."
                className="bg-[#faf7f7] w-64"
                type="number"
              />
              {errors.altMobileNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.altMobileNo}
                </p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.email}
                isInvalid={!!errors.email}
                name="email"
                variant="outlined"
                label="Enter Email"
                className="bg-[#faf7f7] w-64"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <CustomTextField
                select
                label="Select Gender"
                defaultValue=""
                value={formData.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
                name="gender"
                className="bg-[#faf7f7] w-64"
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </CustomTextField>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-2">{errors.gender}</p>
              )}
            </div>

            <div>
              <CustomTextField
                select
                onChange={handleChange}
                value={formData?.branch || ""}
                isInvalid={!!errors.branch}
                name="branch"
                label="Select Branch"
                defaultValue=""
                className="bg-[#faf7f7] w-64"
              >
                <MenuItem value="" disabled>
                  Select Branch
                </MenuItem>
                {branches.map((branch, index) => (
                  <MenuItem key={index} value={branch._id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.designation}
                isInvalid={!!errors.designation}
                name="designation"
                variant="outlined"
                label="Enter Designation"
                className="bg-[#faf7f7] w-64"
                type="text"
              />
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.designation}
                </p>
              )}
            </div>
            <div>
              <div className="flex flex-col mt-[-1rem]">
                <label className="text-xs w-60">Upload Profile Pic*</label>
                <input
                  type="file"
                  name="userPic"
                  onChange={handleFileChange}
                  isInvalid={!!errors.userPic}
                  // value={formData?.userPic || }
                  // value={imagePreview}
                  className="border border-gray-400 rounded-lg p-1 bg-[#faf7f7]"
                />
              </div>
              {errors.userPic && (
                <p className="text-red-500 text-sm mt-1">{errors.userPic}</p>
              )}
            </div>
            <div>
              <CustomTextField
                select
                label="Menu Permission"
                defaultValue=""
                // value={selectName}
                value={formData?.menuPermissionType || ""}
                name="menuPermission"
                isInvalid={!!errors.menuPermission}
                onChange={SelectHandler}
                className="bg-[#faf7f7] w-64"
              >
                <MenuItem value="" disabled>
                  Select Menu Permission
                </MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </CustomTextField>
              {errors.menuPermission && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.menuPermission}
                </p>
              )}
            </div>
            <div>
              <CustomTextField
                select
                label="User Type"
                defaultValue=""
                value={formData.userType}
                onChange={handleChange}
                isInvalid={!!errors.userType}
                name="userType"
                className="bg-[#faf7f7] w-64"
              >
                <MenuItem value="" disabled>
                  Select User Type
                </MenuItem>
                <MenuItem value="Counsellor">Counsellor</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Approver">Approver</MenuItem>
              </CustomTextField>
              {errors.userType && (
                <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
              )}
            </div>
            <div>
              <CustomTextField
                select
                onChange={handleChange}
                label="Selected List"
                defaultValue=""
                value={formData?.selected_list || ""}
                isInvalid={!!errors.selected_list}
                name="selected_list"
                className="bg-[#faf7f7] w-64"
              >
                <MenuItem value="" disabled>
                  Select List
                </MenuItem>
                {teamData.map((team, index) => {
                  if (formData.userType === team.userType) {
                    return (
                      <MenuItem key={index} value={team._id}>
                        {team.name}
                      </MenuItem>
                    );
                  }
                  return null; // Return null if the condition is not met
                })}
              </CustomTextField>
              {errors.selected_list && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selected_list}
                </p>
              )}
            </div>
            {formData?.userPic || imagePreview ? (
              <div className="w-12 h-12 bg-red-100">
                <img
                  src={`data:image/png;base64,${
                    formData?.userPic || imagePreview
                  }`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
          </div>

          {UserIsOpen && (
            <div className="w-[60rem]">
              <FormGroup row className="flex gap-x-10 gap-y-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Dashboard")}
                      value="Dashboard"
                      onChange={getCheckBox}
                    />
                  }
                  label="Dashboard"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Team List")}
                      value="Team List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Team List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Mail List")}
                      value="Mail List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Mail List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes(
                        "Admission List"
                      )}
                      value="Admission List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Admission List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Branch List")}
                      value="Branch List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Branch List"
                />
              </FormGroup>
            </div>
          )}

          {ManagerIsOpen && (
            <div className="w-[65rem]">
              <FormGroup row className="flex gap-x-10 gap-y-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Dashboard")}
                      value="Dashboard"
                      onChange={getCheckBox}
                    />
                  }
                  label="Dashboard"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Team List")}
                      value="Team List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Team List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Mail List")}
                      value="Mail List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Mail List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes(
                        "Admission List"
                      )}
                      value="Admission List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Admission List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Branch List")}
                      value="Branch List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Branch List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Account List")}
                      value="Account List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Account List"
                />
              </FormGroup>
            </div>
          )}

          {AdminIsOpen && (
            <div className="w-[65rem]">
              <FormGroup row className="flex gap-x-8 gap-y-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Dashboard")}
                      value="Dashboard"
                      onChange={getCheckBox}
                    />
                  }
                  label="Dashboard"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Team List")}
                      value="Team List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Team List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Mail List")}
                      value="Mail List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Mail List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes(
                        "Admission List"
                      )}
                      value="Admission List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Admission List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Branch List")}
                      value="Branch List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Branch List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes(
                        "Whatsapp List"
                      )}
                      value="Whatsapp List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Whatsapp List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes(
                        "MainSource List"
                      )}
                      value="MainSource List"
                      onChange={getCheckBox}
                    />
                  }
                  label="MainSource List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes(
                        "SubSource List"
                      )}
                      value="SubSource List"
                      onChange={getCheckBox}
                    />
                  }
                  label="SubSource List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.menuPermission.includes("Account List")}
                      value="Account List"
                      onChange={getCheckBox}
                    />
                  }
                  label="Account List"
                />
              </FormGroup>
            </div>
          )}

          <div className=" flex text-white justify-end mt-4">
            <Link to="/team_list">
              <button className="bg-[#929ca8] mr-10 py-1.5 px-10 text-white rounded-md">
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
                "Create"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
