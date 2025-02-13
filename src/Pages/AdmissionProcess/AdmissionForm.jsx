import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { BeatLoader } from "react-spinners";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CustomTextField from "../../Configs/CustomTextField";
import { fetchBranches } from "../../Redux/Slices/branch.Slice";
import {
  createOrUpdateAdmission,
  fetchAdmissions,
} from "../../Redux/Slices/admission.Slice";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { fetchCourses } from "../../Redux/Slices/course.Slice";
import { fetchAccounts } from "../../Redux/Slices/account.Slice";
import Navbar from "../Navbar/Navbar";
import { fetchMainSource } from "../../Redux/Slices/mainSource.Slice";
import { fetchSubSource } from "../../Redux/Slices/subSource.Slice";
import { fetchTeam } from "../../Redux/Slices/team.Slice";
import TextField from "@mui/material/TextField";

const AdmissionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [EmiCount, setEmiCount] = useState("");
  const [EmiOption, setEmiOption] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.admissionSlice);
  const mainSources = useSelector((state) => state.mainSourceSlice.data);
  const subSources = useSelector((state) => state.subSourceSlice.data);
  const courses = useSelector((state) => state.courseSlice.data);
  const teamData = useSelector((state) => state.team.data);
  const branches = useSelector((state) => state.branchSlice.data);
  const accounts = useSelector((state) => state.accountSlice.data);
  const [courseDetailss, setcourseDetailss] = useState([
    { course: "", price: "" },
  ]);

  const totalAmount = courseDetailss.reduce((total, item) => {
    return total + (parseInt(item.price) || 0); // Ensure price is a number
  }, 0);

  const [EMIData, setEMIData] = useState([
    { amount: "", installDate: "" }, // Initial structure for one EMI
  ]);
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

  const initialState = location?.state
    ? {
        _id: location.state?._id || "",
        enrollNo: location.state?.enrollNo || "",
        admDate: location.state?.admDate || new Date().toISOString(),
        name: location.state?.name || "",
        mobileNo: location.state?.mobileNo || "",
        altMobileNo: location.state?.altMobileNo || "",
        branch: location.state?.branch || "",
        counsellor: location.state?.counsellor || "",
        email: location.state?.email || "",
        mainSource: location.state?.mainSource || "",
        subSource: location.state?.subSource || "",
        address: location.state?.address || "",
        profilePic: location.state?.profilePic || "",
        frontAadhar: location.state?.frontAadhar || "",
        backAadhar: location.state?.backAadhar || "",
        panCard: location.state?.panCard || "",
        approver: location.state?.approver || "",
        courseDetails: location.state?.courseDetails || [
          { course: "", coursePrice: "" },
        ],
        paymentType: location.state?.paymentType || "",
        paymentMode: location.state?.paymentMode || "",
        downPayment: location.state?.downPayment || "",
        remark: location.state?.remark || "",
        paymentAccount: location.state?.paymentAccount || "",
        emiCount: location.state?.emiCount || [],
        installAmount: location.state?.installAmount || [],
        installDate: location.state?.installDate || [],
        admStatus: location.state?.admStatus || "",
        rejectComment: location.state?.rejectComment || "",
        approvedComment: location.state?.approvedComment || "",
        createdBy: location.state?.createdBy || user?._id || "",
        isDeleted: location.state?.isDeleted || false,
      }
    : {
        enrollNo: "",
        admDate: new Date().toISOString(),
        name: "",
        mobileNo: "",
        altMobileNo: "",
        branch: "",
        counsellor: "",
        email: "",
        mainSource: "",
        subSource: "",
        address: "",
        profilePic: "",
        frontAadhar: "",
        backAadhar: "",
        panCard: "",
        approver: "",
        courseDetails: [
          {
            course: "",
            coursePrice: "",
          },
        ],
        paymentType: "",
        paymentMode: "",
        downPayment: "",
        remark: "",
        paymentAccount: "",
        emiCount: "",
        installDetails: [
          {
            amount: "",
            installDate: "",
            emiRecieveDate: "",
            emiStatus: "",
            paymentMode: "",
            invoice: "",
            updateBy: "",
          },
        ],
        admStatus: "pending",
        // rejectComment: "",
        // approvedComment: "",
        createdBy: user?._id,
        isDeleted: false,
      };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  let afterDownAmount = "";
  let EmiAmounts = "";
  if (totalAmount > 0) {
    afterDownAmount = totalAmount - formData.downPayment;
    EmiAmounts = [afterDownAmount / formData.emiCount];
  }
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchCourses());
    dispatch(fetchAccounts());
    dispatch(fetchMainSource());
    dispatch(fetchSubSource());
    dispatch(fetchTeam());
  }, []);
  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};

    // Check if each field is not empty
    // if (!formData.enrollNo.trim()) {
    //   validationErrors.enrollNo = "Enrollment Number is required";
    //   isValid = false;
    // }

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.mobileNo.trim()) {
      validationErrors.mobileNo = "Mobile Number is required";
      isValid = false;
    }

    if (!formData.altMobileNo.trim()) {
      validationErrors.altMobileNo = "Alternate Mobile Number is required";
      isValid = false;
    }

    if (!formData.branch.trim()) {
      validationErrors.branch = "Branch is required";
      isValid = false;
    }

    if (!formData.counsellor.trim()) {
      validationErrors.counsellor = "Counsellor is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.mainSource.trim()) {
      validationErrors.mainSource = "Main Source is required";
      isValid = false;
    }

    if (!formData.subSource.trim()) {
      validationErrors.subSource = "Sub Source is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.profilePic.trim()) {
      validationErrors.profilePic = "Profile Picture is required";
      isValid = false;
    }

    if (!formData.frontAadhar.trim()) {
      validationErrors.frontAadhar = "Front Aadhar is required";
      isValid = false;
    }

    if (!formData.backAadhar.trim()) {
      validationErrors.backAadhar = "Back Aadhar is required";
      isValid = false;
    }

    if (!formData.panCard.trim()) {
      validationErrors.panCard = "Pan Card is required";
      isValid = false;
    }

    if (!formData.approver.trim()) {
      validationErrors.approver = "Approver is required";
      isValid = false;
    }

    // Course details validation
    formData.courseDetails.forEach((courseDetail, index) => {
      if (!courseDetail.course.trim()) {
        validationErrors[`course${index}`] = `Course is required`;
        isValid = false;
      }
    });

    if (!formData.paymentType.trim()) {
      validationErrors.paymentType = "Payment Type is required";
      isValid = false;
    }

    if (!formData.paymentMode.trim()) {
      validationErrors.paymentMode = "Payment Mode is required";
      isValid = false;
    }

    if (!formData.downPayment.trim()) {
      validationErrors.downPayment = "Down Payment is required";
      isValid = false;
    }

    if (!formData.remark.trim()) {
      validationErrors.remark = "Remark is required";
      isValid = false;
    }
    if (!formData.emiCount.trim()) {
      validationErrors.emiCount = "EMICount is required";
      isValid = false;
    }
    if (!formData.paymentAccount.trim()) {
      validationErrors.paymentAccount = "PaymentAccount is required";
      isValid = false;
    }
    if (!formData.EMIData?.amount.trim()) {
      validationErrors.EMIDataAmount = "EMIAmount is required";
      isValid = false;
    }
    if (!formData.EMIData?.installDate.trim()) {
      validationErrors.installDate = "InstallDate is required";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };
  const handleEMIChange = (index, field, val) => {
    const updateEMI = [...EMIData];
    updateEMI[index][field] = val;

    setEMIData(updateEMI);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("Admission course Details", courseDetailss);
    // if (!validateForm()) return;
    const updatedCourseDetails = courseDetailss.map((courseItem) => ({
      course: courseItem.course,
      coursePrice: courseItem.price,
    }));
    const updatedEMIDetails = EMIData.map((emi)=>({
      amount: emi.amount,
      installDate: emi.installDate,
    }));
    const updatedFormData = {
      ...formData,
      courseDetails: updatedCourseDetails,
      EMIData: updatedEMIDetails
    };

    setFormData(updatedFormData);
    console.log("Admission formData Request before api hit", updatedFormData);
    try {
      const resultAction = await dispatch(createOrUpdateAdmission(updatedFormData));
      if (createOrUpdateAdmission.fulfilled.match(resultAction)) {
        console.log("admission resultAction", resultAction);
        navigate("/admission_list");
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
      const resultAction = await dispatch(createOrUpdateAdmission(updateData));
      if (createOrUpdateAdmission.fulfilled.match(resultAction)) {
        navigate("/team_list");
      } else {
        toast.error("Failed to update team!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  const handleFieldChange = async (index, name, value) => {
    try {
      const updatedFields = [...courseDetailss];
      updatedFields[index][name] = value;

      if (name === "course") {
        const price = await getCoursePrice(value);
        updatedFields[index].price = price || "";
      }

      setcourseDetailss(updatedFields);
    } catch (error) {
      console.log("Error fetching price", error);
    }
  };
  const getCoursePrice = async (value) => {
    //getCourse Price by default help to call api
    const CoursePrice = await courses.find((course) => course._id === value);
    return CoursePrice.price;
  };
  const CoursePlusHandler = () => {
    setcourseDetailss([...courseDetailss, { course: "", price: "" }]); // Add an empty course
  };
  const CourseMinusHandler = (index) => {
    setcourseDetailss(courseDetailss.filter((_, i) => i !== index));
  };
  const handleFileChange = (e) => {
    const { name } = e.target; // Get the name of the input field
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Get the Base64 string

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: base64String, // Dynamically set the Base64 data for the corresponding field
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCourseChange = async (index, value) => {
    try {
      const updatedCourses = [...courseDetailss];
      updatedCourses[index].course = value;
  
      // Fetch price dynamically
      const price = await getCoursePrice(value);
      updatedCourses[index].price = price;
  
      setcourseDetailss(updatedCourses);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };
  const SelectPaymentHandler = (event) => {
    const paymentType = event.target.value;
    // Update form data
    setFormData({
      ...formData,
      paymentType: paymentType,
    });
    // Manage EMI option visibility
    if (paymentType === "Installment") {
      setEmiOption(true);
    } else {
      setEmiOption(false);
    }
  };
  const handleEmiCount = (e) => {
    const emiCount = e.target.value;
    setFormData({
      ...formData,
      emiCount: emiCount,
    });
    setEmiCount(emiCount);
  };
  return (
    <>
      <Navbar title={"Admission Form"} />
      <div className=" mx-3">
        <ToastContainer />
        {/* Form Content */}
        <div className="bg-white p-3 my-2 w-full rounded-lg shadow-md">
          {/* Personal Details Section */}
          <h3 className="text-lg font-semibold mb-1 text-[#637D9B]">
            Personal Details
          </h3>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-y-4 gap-x-3">
            <CustomTextField
              disabled
              value="NO-24-2024-001"
              variant="outlined"
              label="Enter Enroll  No"
              className="bg-[#faf7f7] "
              type="text"
            ></CustomTextField>

            <CustomTextField
              disabled
              // value={formattedDate}
              // onChange={handleChange}
              name="addmission_date"
              label="Enter Adm Date"
              type="date"
              className="bg-[#faf7f7] "
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input for 'type=date'
              }}
            />
            <div>
              <CustomTextField
                onChange={handleChange}
                name="name"
                value={formData.name}
                isInvalid={!!errors.name}
                variant="outlined"
                label="Enter Your Name"
                className="bg-[#faf7f7] w-[16.4rem]"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                name="email"
                value={formData.email}
                isInvalid={!!errors.name}
                variant="outlined"
                label="Enter Your Email"
                className="bg-[#faf7f7] w-[16.4rem]"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                name="mobileNo"
                value={formData.mobileNo}
                isInvalid={!!errors.mobileNo}
                variant="outlined"
                label="Enter Mobile No."
                className="bg-[#faf7f7] w-[16.4rem]"
                type="number"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-xs">{errors.mobileNo}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.altMobileNo}
                isInvalid={!!errors.altMobileNo}
                name="altMobileNo"
                variant="outlined"
                label="Enter Alt Mobile No"
                className="bg-[#faf7f7] w-[16.4rem]"
                type="number"
              />
              {errors.altMobileNo && (
                <p className="text-red-500 text-xs">{errors.altMobileNo}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                name="branch"
                value={formData.branch}
                isInvalid={!!errors.branch}
                select
                label="Select Branch"
                defaultValue=""
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Branch
                </MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch._id} value={branch._id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors.branch && (
                <p className="text-red-500 text-xs">{errors.branch}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                name="counsellor"
                value={formData.counsellor}
                isInvalid={!!errors.counsellor}
                select
                label="Select Counsellor"
                defaultValue=""
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Counsellor
                </MenuItem>
                {teamData.map((team) => {
                  if (team.userType === "Counsellor") {
                    return <MenuItem value={team._id}>{team.name}</MenuItem>;
                  }
                })}
              </CustomTextField>
              {errors.counsellor && (
                <p className="text-red-500 text-xs">{errors.counsellor}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.mainSource}
                isInvalid={!!errors.mainSource}
                name="mainSource"
                select
                label="Select Main Source"
                defaultValue=""
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Main Source
                </MenuItem>
                {mainSources.map((source) => (
                  <MenuItem key={source._id} value={source._id}>
                    {source.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors.mainSource && (
                <p className="text-red-500 text-xs">{errors.mainSource}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                name="subSource"
                value={formData.subSource}
                select
                label="Select Sub Source"
                defaultValue=""
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Sub Source
                </MenuItem>
                {subSources.map((sub) => (
                  <MenuItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors.subSource && (
                <p className="text-red-500 text-xs">{errors.subSource}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <TextField
                id="outlined-multiline-flexible"
                onChange={handleChange}
                name="address"
                value={formData.address}
                variant="outlined"
                label="Enter  Your Address"
                className="bg-[#faf7f7] w-[33.5rem]"
                type="text"
                InputProps={{
                  style: {
                    padding: "9px 8px", // Adjust padding
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "14px", // Adjust label size to match smaller input
                    margin: "1px 2px 2px 1px",
                    top: "-5px",
                  },
                }}
                multiline
                maxRows={2}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address}</p>
              )}
            </div>
          </div>
          {/* upload Field */}
          <div className="flex flex-col md:flex-row gap-3 md:justify-start mt-1 text-sm">
            <div className="flex flex-col">
              <label>Upload Profile Pic*</label>
              <input
                // onChange={(e) => setProfilePic(e.target.files[0])}
                onChange={handleFileChange}
                name="profilePic"
                type="file"
                className="w-64 border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]"
              />
              {errors.profilePic && (
                <p className="text-red-500 text-xs">{errors.profilePic}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Upload PAN Card*</label>
              <input
                onChange={handleFileChange}
                name="panCard"
                type="file"
                className="border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]"
              />
              {errors.panCard && (
                <p className="text-red-500 text-xs">{errors.panCard}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Upload Front Side Of Aadhar Card*</label>
              <input
                onChange={handleFileChange}
                name="frontAadhar"
                type="file"
                className="border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]"
              />
              {errors.frontAadhar && (
                <p className="text-red-500 text-xs">{errors.frontAadhar}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Upload Back Side Of Aadhar Card*</label>
              <input
                onChange={handleFileChange}
                name="backAadhar"
                type="file"
                className="w-64 border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]"
              />
              {errors.backAadhar && (
                <p className="text-red-500 text-xs">{errors.backAadhar}</p>
              )}
            </div>
          </div>

          {/* Add Course Section */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div>
              <CustomTextField
                onChange={(e) => handleCourseChange(0,e.target.value)}
                value={courseDetailss[0]?.course || ""} // Handle the first course value
                select
                label="Select Course Name"
                defaultValue=""
                className="bg-[#faf7f7] md:w-[16rem]"
              >
                <MenuItem value="" disabled>
                  Select Course Name
                </MenuItem>
                {courses.map((course, index) => (
                  <MenuItem key={index} value={course._id}>
                    {course.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors.course0 && (
                <p className="text-red-500 text-xs">{errors.course0}</p>
              )}
            </div>
            <div>
              <CustomTextField
                disabled
                value={courseDetailss[0]?.price || ""} // Display the fetched price or blank
                variant="outlined"
                label="Enter Course Price"
                className="bg-[#faf7f7] w-[20rem] md:w-60"
                type="number"
                readOnly // Prevent manual edits
              />
              <AddIcon
                fontSize="medium"
                onClick={CoursePlusHandler}
                className="text-white mt-2 ml-1 cursor-pointer bg-gray-400 rounded-md"
              />
            </div>
            <CustomTextField
              disabled
              label="Total Amount"
              variant="outlined"
              value={totalAmount}
              className="bg-[#faf7f7] w-[16.6rem]"
              type="number"
              readOnly
            />
          </div>

          {/* Render Added Courses */}
          {courseDetailss.slice(1).map((courseDetail, index) => (
            <div
              key={index + 1}
              className="flex flex-col md:flex-row gap-3 pt-4"
            >
              {/* Course Name Dropdown */}
              <CustomTextField
                onChange={(e) =>
                  handleCourseChange(index + 1, e.target.value)
                }
                value={courseDetail.course || ""}
                select
                label="Select Course Name"
                defaultValue=""
                className="bg-[#faf7f7] md:w-[16rem]"
              >
                <MenuItem value="" disabled>
                  Select Course Name
                </MenuItem>
                {courses.map((course, index) => (
                  <MenuItem key={index} value={course._id}>
                    {course.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors[`course${index + 1}`] && (
                <p className="text-red-500 text-xs">
                  {errors[`course${index + 1}`]}
                </p>
              )}

              {/* Course Price Input */}
              <div className="flex gap-2">
                <CustomTextField
                  disabled
                  value={courseDetail.price || ""} // Display the price for the current course
                  variant="outlined"
                  label="Course Price"
                  className="bg-[#faf7f7] w-60"
                  type="number"
                  readOnly // Prevent manual edits
                />

                {/* Remove Course Button */}
                <div className="w-2">
                  <RemoveIcon
                    fontSize="medium"
                    onClick={() => CourseMinusHandler(index + 1)} // Remove course at this index
                    className="text-white mt-2 cursor-pointer bg-gray-400 rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses & EMI Section */}
        <div className="bg-white px-3 pb-1 w-full rounded-lg shadow-md">
          <h3 className="text-lg mb-2 font-semibold text-[#637D9B]">
            Courses & EMI
          </h3>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
            <div>
              <CustomTextField
                select
                label="Select Payment Type"
                defaultValue=""
                onChange={SelectPaymentHandler}
                value={formData.paymentType}
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Payment Type
                </MenuItem>
                <MenuItem value="Full">Full</MenuItem>
                <MenuItem value="Installment">Installment</MenuItem>
              </CustomTextField>
              {errors.paymentType && (
                <p className="text-red-500 text-xs">{errors.paymentType}</p>
              )}
            </div>
            <div>
              <CustomTextField
                onChange={handleChange}
                value={formData.paymentMode}
                name="paymentMode"
                select
                label="Select Payment Mode"
                defaultValue=""
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Payment Mode
                </MenuItem>
                <MenuItem value="Case">Cash</MenuItem>
                <MenuItem value="Net Banking">Net Banking</MenuItem>
                <MenuItem value="debit/Credit Card">Debit/Credit Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </CustomTextField>
              {errors.paymentMode && (
                <p className="text-red-500 text-xs">{errors.paymentMode}</p>
              )}
            </div>
            {EmiOption && (
              <div>
                <CustomTextField
                  onChange={handleChange}
                  name="downPayment"
                  value={formData.downPayment}
                  variant="outlined"
                  label="Enter Down Payment"
                  className="bg-[#faf7f7] w-[16.4rem]"
                  type="text"
                />
                {/* Error Message for Down Payment */}
                {errors.downPayment && (
                  <p className="text-red-500 text-xs">{errors.downPayment}</p>
                )}
              </div>
            )}
            <div className="">
              <TextField
                id="outlined-multiline-flexible"
                onChange={handleChange}
                name="remark"
                value={formData.remark}
                variant="outlined"
                label="Enter Remarks"
                className="bg-[#faf7f7] w-[16.4rem]"
                type="text"
                InputProps={{
                  style: {
                    padding: "9px 8px", // Adjust padding
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "14px", // Adjust label size to match smaller input
                    margin: "1px 2px 2px 1px",
                    top: "-5px",
                  },
                }}
                multiline
                maxRows={2}
              />
              {errors.remark && (
                <p className="text-red-500 text-xs">{errors.remark}</p>
              )}
            </div>
            {EmiOption && (
              <div>
                <CustomTextField
                  variant="outlined"
                  label="Enter No. of EMI"
                  onChange={handleEmiCount}
                  name="emiCount"
                  className="bg-[#faf7f7] w-[16.4rem]"
                  type="number"
                />
                {errors.emiCount && (
                  <p className="text-red-500 text-xs">{errors.emiCount}</p>
                )}
              </div>
            )}
            <div>
              <CustomTextField
                onChange={handleChange}
                name="paymentAccount"
                value={formData.paymentAccount}
                select
                label="Select Payment Account"
                defaultValue=""
                required
                className="bg-[#faf7f7] w-[16.4rem]"
              >
                <MenuItem value="" disabled>
                  Select Payment Account
                </MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account._id} value={account._id}>
                    {account.accountHolderName} ({account.bankName})
                  </MenuItem>
                ))}
              </CustomTextField>
              {errors.paymentAccount && (
                <p className="text-red-500 text-xs">{errors.paymentAccount}</p>
              )}
            </div>
          </div>

          {Array.from({ length: EmiCount }).map((val, index) => (
            <div key={index + 1} className="flex mt-4 gap-4">
              <div>
                <CustomTextField
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]*$/.test(value)) {
                      handleEMIChange(index, "amount", value);
                    }
                  }}
                  // value={EMIData?.amount}
                  value={EmiAmounts}
                  variant="outlined"
                  label="Enter Installment Amt"
                  className="bg-[#faf7f7] w-[16.3rem]"
                  type="text"
                ></CustomTextField>
                {errors.EMIDataAmount && (
                  <p className="text-red-500 text-xs">{errors.EMIDataAmount}</p>
                )}
              </div>
              <div>
                <CustomTextField
                  onChange={(e) =>
                    handleEMIChange(index, "installDate", e.target.value)
                  }
                  // value={EMIData[index]?.installDate || ""}
                  value={EMIData.installDate}
                  variant="outlined"
                  label="Enter Installment Date"
                  className="bg-[#faf7f7] w-[16.5rem]"
                  type="date"
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input for 'type=date'
                  }}
                ></CustomTextField>
                {errors.installDate && (
                  <p className="text-red-500 text-xs">{errors.installDate}</p>
                )}
              </div>
            </div>
          ))}

          {/* Submit and Back Button */}
          <div className="flex justify-end mt-2 mb-2">
            <Link to="/admission_list">
              <div className="mr-5">
                <button className="bg-[#97acc4] py-2 px-5 rounded-md text-white">
                  Back
                </button>
              </div>
            </Link>
            <button
              className="bg-[#637D9B] text-white rounded-md px-8 py-1.5"
              disabled={isLoading}
              onClick={location?.state ? handleUpdate : handleCreate}
            >
              {isLoading ? (
                <BeatLoader size={10} color="#ffffff" />
              ) : location?.state ? (
                "Update"
              ) : (
                "Send for Approver"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionForm;
