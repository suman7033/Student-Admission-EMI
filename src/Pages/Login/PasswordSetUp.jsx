import React, { useState } from "react";
import login_corner1 from "../../img/Group 1000006545.png";
import login_corner2 from "../../img/Group 1000006544.png";
import login_image from "../../img/Cybersecurity and cyber risk mitigation.jpg";
import login_corner3 from "../../img/Group 1000006546.png";
import login_corner4 from "../../img/Group 1000006547.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { password_setup } from "../../Redux/Slices/auth.Slice";
import CustomTextField from "../../Configs/CustomTextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PasswordSetUp = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    let updatedErrors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (!newPassword.trim()) {
      updatedErrors.newPassword = "New Password can't be blank";
      isValid = false;
    } else if (newPassword.length < 6) {
      updatedErrors.newPassword = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      updatedErrors.confirmPassword = "Confirm Password can't be blank";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      updatedErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const SubmitHandler = async () => {
    if (!validateForm()) return;

    const token = new URLSearchParams(window.location.search).get("id");
    const SubmitData = {
      password: newPassword,
      token: token,
    };

    try {
      const resultAction = await dispatch(password_setup(SubmitData));
      if (resultAction.fulfilled.match(resultAction)) {
         navigate("/password_setup_sucessfull");
      } 
      else {
        toast.error("Password setup failed");
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.");
      // toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center bg-[#f2f8f233] items-center min-h-screen px-4 sm:px-8">
      <ToastContainer />
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-4/5 bg-white shadow-lg rounded-lg">
        {/* Left Side */}
        <div className="hidden md:block w-1/2 bg-white">
          <div className="w-full flex justify-between">
            <img
              className="rounded-xl w-16 h-12 md:w-20 md:h-16"
              src={login_corner1}
              alt="Corner 1"
            />
            <img
              className="w-24 h-10 md:w-30 md:h-12"
              src={login_corner2}
              alt="Corner 2"
            />
          </div>

          <div className="w-full mt-4">
            <img
              className="h-52 md:h-96 w-full object-contain"
              src={login_image}
              alt="Login"
            />
          </div>

          <div className="w-full flex justify-between mt-4">
            <img
              className="rounded-xl w-16 h-12 md:w-20 md:h-16"
              src={login_corner3}
              alt="Corner 3"
            />
            <img
              className="w-24 h-10 md:w-30 md:h-16"
              src={login_corner4}
              alt="Corner 4"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-full md:w-3/5 p-6 bg-[#637D9B94] rounded-lg md:rounded-r-lg">
          <div className="bg-white rounded-md max-w-md shadow-lg p-6">
            <div className="flex flex-col items-center">
              <h1 className="font-semibold text-gray-600 text-lg md:text-xl text-center">
                Reset Password
              </h1>

              <div className="w-full mt-4">
                <CustomTextField
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                  label="New Password"
                  className="form-control w-full"
                  name="newPassword"
                  type="text"
                  required
                  value={newPassword}
                  error={Boolean(errors.newPassword)}
                  helperText={errors.newPassword}
                />
              </div>

              <div className="w-full mt-4">
                <CustomTextField
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  label="Confirm Password"
                  className="form-control w-full"
                  name="confirmPassword"
                  type="text"
                  required
                  value={confirmPassword}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                />
              </div>

              <button
                onClick={SubmitHandler}
                className="bg-[#093b7480] text-white rounded-md p-2 px-12 md:px-32 mt-6"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetUp;
