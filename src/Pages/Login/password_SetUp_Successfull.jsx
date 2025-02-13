import React from "react";
import { Link } from "react-router-dom";
import SendSucessPic from "../../img/password setup successfull.webp";

const password_SetUp_Successfull = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="mt-10 text-center">
        <h1 className="text-green-500 text-3xl md:text-5xl font-bold">
          Password Reset Successfull
        </h1>
        {/* <h2 className="text-gray-500 text-sm md:text-lg mt-2">
          Check Your Email for the Reset Link
        </h2> */}
        <Link
          to="/login"
          className="text-blue-500 cursor-pointer underline underline-offset-2 mt-3 inline-block text-sm md:text-base"
        >
          Login
        </Link>
      </div>
      <img
        className="w-40 md:w-60 mt-5 rounded-lg"
        src={SendSucessPic}
        alt="Email Sent"
      />
    </div>
  );
};

export default password_SetUp_Successfull;
