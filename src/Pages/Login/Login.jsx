import React, { useState } from "react";
import login_corner1 from "../../img/Group 1000006545.png";
import login_corner2 from "../../img/Group 1000006544.png";
import login_image from "../../img/Cybersecurity and cyber risk mitigation.jpg";
import login_corner3 from "../../img/Group 1000006546.png";
import login_corner4 from "../../img/Group 1000006547.png";
import BeatLoader from "react-spinners/BeatLoader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import apiService from "../../Configs/API";
import { login } from "../../Redux/Slices/auth.Slice";
import CustomTextField from "../../Configs/CustomTextField";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      email: "",
      password: "",
    };

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      updatedErrors.email = "Email id can't be blank";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      updatedErrors.email = "Enter a valid Email ID.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      updatedErrors.password = "Password can't be blank";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
      // Perform your login logic here
      try{
      const isLogin = await apiService.login(formData);

      console.log("isLogin responsive after go inside slice",isLogin.data);
      if (isLogin.success) {
        await localStorage.setItem("token", isLogin.data.token);
        localStorage.setItem("user", JSON.stringify(isLogin.data.user)); 
        await dispatch(
          login({
            user: isLogin.data.user,
            token: isLogin.data.token,
          })
        );
        setIsLoading(false);

        toast.success(isLogin.message);
        navigate("/");
      } else {
        toast.error(isLogin.message);
        setIsLoading(false);
      }
    }catch(error){
      console.log("error",error);
      toast.error("Something went wrong. Please try again later.");
    }
    }
  return (
    <div className="flex flex-col bg-[#f2f8f233] justify-center items-center h-screen">
      <ToastContainer />
      <div className="w-3/4 h-4/5 flex">
        {/* left side */}
        <div className="hidden md:block bg-white w-4/5">
          <div className="w-full flex justify-between">
            <img className="rounded-xl w-20 h-16" src={login_corner1} />
            <img className="w-30 h-12" src={login_corner2} />
          </div>

          <div className="w-full flex justify-center">
            <img className="h-96" src={login_image} />
          </div>

          <div className="w-full flex justify-between">
            <img className="rounded-xl w-20 h-16" src={login_corner3} />
            <img className="w-30 h-16" src={login_corner4} />
          </div>
        </div>

        {/* right side */}
        <div></div>
        <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-r-2xl bg-[#637D9B94] w-full">
          <div className=" bg-[#FFFFFF] shadow-md rounded-2xl w-64 md:w-3/4 h-80 flex flex-col items-center text-[#374151]  ">
            <span className="text-xl font-bold mt-3">Welcome!</span>
            <span className="text-sm text-center">
              Please sign in to your account.
            </span>
            <br />

            <div className="w-4/5 mb-3">
              <CustomTextField
                onChange={handleInputChange}
                variant="outlined"
                label="Enter Your Email"
                className='form-control w-full'
                name="email"
                type="email"
                required
                value={formData.email}
                error={Boolean(errors.email)}
              >
              </CustomTextField>
            </div>
            <div className="w-4/5 mt-4 flex items-center px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bebeea]">
              <CustomTextField
                onChange={handleInputChange}
                value={formData.password}
                error={Boolean(errors.password)}
                name="password"
                variant="outlined"
                label="Enter Your Password"
                className="w-full"
                required
                type={showPassword ? "text" : "password"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-root": { height: "20px", left: "-18px" },
                  "& .MuiInputLabel-root": {
                    top: "-70%",
                    left: "-20px",
                    height: "30px",
                    fontSize: "14px",
                    paddingBottom: "2px",
                  },
                }}
              >
              </CustomTextField>
              {/* Toggle visibility icon */}
              {showPassword ? (
                <VisibilityIcon
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <VisibilityOffIcon
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
              {/* </div> */}
            </div>

            <div className="w-4/5 text-left mb-3">
              <Link to="/forgot_password">
                <label className="text-sm text-blue-500 hover:underline cursor-pointer">
                  Forgot Password?
                </label>
              </Link>
            </div>
            <div>
              <button
                disabled={isLoading}
                className="px-20 sm:px-20 lg:px-36 bg-[#637D9B] text-white py-1 rounded-lg hover:bg-[#93b3d8] transition duration-200"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex justify-evenly items-center">
                    <BeatLoader
                      color="#ffffff"
                      loading={true}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <span className="">
        Manage & Developed by
        <a href="https://matrixinfotechsolution.com/" target="_blank">
          <b> Matrix Infotech Solution</b>
        </a>{" "}
      </span>
    </div>
  );
};

export default Login;
