import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ProfilePage = () => { 
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <Navbar title={"Profile"}/>
    <div className="p-3 bg-gray-100">
      {/* White container for Personal Details */}
      <div className="bg-white py-1 px-3 mb-6 rounded-lg text-center md:text-left shadow-md">
        <div className="  flex items-center">
          <Link to="/">
            <ArrowBackIcon className=" cursor-pointer" />
          </Link>
        </div>
        <div className="p-8 flex flex-col md:flex-row gap-6">
          {/* Left side - Profile image */}
          <div className="flex justify-center">
            <img
              className="rounded-full md:mr-24 w-24 sm:w-32 lg:w-40"
              src={`data:image/png;base64,${user.userPic}`}
              alt="Profile"
            />
          </div>

          {/* Right side - Personal details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Column 1 */}
            <div>
              <label className="font-bold block">Name</label>
              <span className="text-gray-600">{user.name}</span>

              <label className="font-bold block mt-2">Designation</label>
              <span className="text-gray-600">{user.designation}</span>

              <label className="font-bold block mt-2">UserType</label>
              <span className="text-gray-600">{user.userType}</span>
            </div>

            {/* Column 2 */}
            <div>
              <label className="font-bold block">Email</label>
              <span className="text-gray-600">{user.email}</span>

              <label className="font-bold block mt-2">Address</label>
              <span className="text-gray-600">Delhi</span>

              <label className="font-bold block mt-2">Permission</label>
              <span className="text-gray-600">{user.permission}</span>
            </div>

            {/* Column 3 */}
            <div>
              <label className="font-bold block">Phone No</label>
              <span className="text-gray-600">{user.mobileNo}</span>

              <label className="font-bold block mt-2">Alt Phone No</label>
              <span className="text-gray-600">7033020947</span>

              <label className="font-bold block mt-2">Branch</label>
              <span className="text-gray-600">{user.branch}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
