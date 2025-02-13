import React, { useEffect, useState } from "react";
import login_corner1 from "../../img/Group 1000006545.png";
import login_corner2 from "../../img/Group 1000006544.png";
import login_image from "../../img/Cybersecurity and cyber risk mitigation.jpg";
import login_corner3 from "../../img/Group 1000006546.png";
import login_corner4 from "../../img/Group 1000006547.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { privateRoute } from "../../Configs/API";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { forgot } from "../../Redux/Slices/auth.Slice";
import CustomTextField from "../../Configs/CustomTextField";
import SendingGif from "../../img/send loader.gif";

const forgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ForgotEmail, setForgotEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);

  const validation = () => {
    let isValid = true;
    let validateError = {};
    if (!ForgotEmail.trim()) {
      validateError.email = "Enter The Email";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(ForgotEmail.trim())) {
        validateError.NotValidEmail = "Enter a valid email address";
        isValid = false;
      }
    }
    setErrors(validateError);
    return isValid;
  };
  const ForgotHandler = async () => {
    if (!validation()) return;
    setLoader(true);
    const formData = {
      email: ForgotEmail,
    };

    try {
      const resultAction = await dispatch(forgot(formData));
      if (forgot.fulfilled.match(resultAction)) {
        setLoader(false);
        setTimeout(()=>{
          navigate("/sent_successfull");
        },1500)
      } else {
        setLoader(false);
        toast.error("Failed to create/update team!");
      }
    } catch (error) {
      console.error("Error during forgot:", error);
      toast.error("Something Wrong Please Try Again");
    }
  };
  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center">
          <img className="rounded-md w-1/2 mt-10" src={SendingGif} />
        </div>
      ) : (
        <div className="flex justify-center bg-[#f2f8f233] items-center  h-screen">
          <ToastContainer />
          <div className="w-3/4 h-4/5 flex">
            {/* left side */}
            <div className="hidden md:block w-4/5 bg-white">
              <div className="w-full flex justify-between">
                <img className="rounded-xl w-20 h-16" src={login_corner1} />
                <img className="w-30 h-12" src={login_corner2} />
              </div>

              <div className="w-full">
                <img className="h-96" src={login_image} />
              </div>

              <div className="w-full flex justify-between">
                <img className="rounded-xl w-20 h-16" src={login_corner3} />
                <img className="w-30 h-16" src={login_corner4} />
              </div>
            </div>

            {/* right side */}

            <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-r-2xl bg-[#637D9B94] w-full">
              <div className="bg-white rounded-md h-72 w-96 shadow-lg">
                <Link to="/login">
                  <KeyboardBackspaceIcon />
                </Link>
                <div className="flex flex-col items-center">
                  <h1 className="font-semibold text-gray-600 m-5 text-center">
                    Forgot Password
                  </h1>

                  <div className="w-4/5 m-3">
                    <CustomTextField
                      onChange={(e) => setForgotEmail(e.target.value)}
                      value={ForgotEmail}
                      isInvalid={!!errors.email}
                      name="email"
                      variant="outlined"
                      label="Enter Email"
                      className="bg-[#faf7f7] w-[19rem]"
                      error={Boolean(errors.email)}
                      type="email"
                    />
                    {errors.NotValidEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.NotValidEmail}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={ForgotHandler}
                    className="bg-[#163c6880] text-white rounded-md p-2 px-24 "
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default forgotPassword;
