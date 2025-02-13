import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const teamDetails = () => {
  const location = useLocation();
  const data = location?.state;
  useEffect(() => {
    console.log("menuPermission", data);
    setMenuPermission(data.menuPermission);
  }, []);
  const [menuPermission, setMenuPermission] = useState([]);
  return (
    <>
      <Navbar title={"Team Details"} />
      <div className="p-3 bg-gray-100">
        {/* White container for Personal Details */}
        <div className="bg-white py-1 px-3 mb-6 rounded-lg text-center md:text-left shadow-md">
          <div className="  flex items-center">
            <Link to="/team_list">
              <ArrowBackIcon className=" cursor-pointer" />
            </Link>
          </div>
          <div className="p-8 flex flex-col md:flex-row gap-6">
            {/* Left side - Profile image */}
            <div className="flex justify-center">
              <img
                className="rounded-full md:mr-24 w-24 sm:w-32 lg:w-40 h-52"
                src={`data:image/png;base64,${data.userPic}`}
                alt="Profile"
              />
            </div>

            {/* Right side - Personal details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {/* Column 1 */}
              <div>
                <label className="font-bold block">Name</label>
                <span className="text-gray-600">{data.name}</span>

                <label className="font-bold block">Gender</label>
                <span className="text-gray-600">{data.gender}</span>

                <label className="font-bold block mt-2">Designation</label>
                <span className="text-gray-600">{data.designation}</span>

                <label className="font-bold block mt-2">UserType</label>
                <span className="text-gray-600">{data.userType}</span>
              </div>

              {/* Column 2 */}
              <div>
                <label className="font-bold block">Email</label>
                <span className="text-gray-600">{data.email}</span>

                <label className="font-bold block mt-2">Address</label>
                <span className="text-gray-600">Delhi</span>

                <label className="font-bold block mt-2">Permission</label>
                <span className="text-gray-600">
                  {menuPermission.map((e) => {
                    return <div>{e}</div>;
                  })}
                </span>
              </div>

              {/* Column 3 */}
              <div>
                <label className="font-bold block">Phone No</label>
                <span className="text-gray-600">{data.mobileNo}</span>

                <label className="font-bold block mt-2">Alt Phone No</label>
                <span className="text-gray-600">7033020947</span>

                <label className="font-bold block mt-2">Branch</label>
                <span className="text-gray-600">{data.branch}</span>

                <label className="font-bold block mt-2">Status</label>
                <span className="text-gray-600 flex items-center gap-1">
                  {data.status ? (
                    <CheckCircleIcon className="text-green-500" />
                  ) : (
                    <CancelIcon className="text-red-500" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default teamDetails;
