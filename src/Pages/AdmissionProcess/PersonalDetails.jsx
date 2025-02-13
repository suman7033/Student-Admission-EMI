import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BulletList } from "react-content-loader";
import GreenTick from "../../img/GreenTick.png";
import DocumentAttached from "./DocumentAttached";
import EMIDetails from "./EMIDetails";

const PersonalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (location?.state) {
      setFilteredData(location.state);
    } else {
      navigate("/admission_list");
    }
  }, [location, navigate]);

  if (!filteredData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar title={"Admission Details"} />
      <div className="p-3 bg-gray-100">
        {/* White container for Personal Details */}
        <div className="bg-white py-4 px-5 mb-4 rounded-lg shadow-md">
          <label className="text-lg font-semibold mb-4 block">
            PERSONAL DETAILS
          </label>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Profile image */}
            <div className="w-24 sm:w-32 lg:w-48">
              <img
                className="rounded-full w-full h-auto"
                src={`data:image/png;base64,${filteredData.profilePic}`}
                alt="Profile"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {/* Column 1 */}
              <div>
                <label className="font-bold block">Name</label>
                <span className="text-gray-600">{filteredData.name}</span>

                <label className="font-bold block mt-2">Gender</label>
                <span className="text-gray-600">{filteredData.gender}</span>

                <label className="font-bold block mt-2">Counselor Name</label>
                <span className="text-gray-600">{filteredData.counsellor}</span>

                <label className="font-bold block mt-2">Admission Date</label>
                <span className="text-gray-600">
                  {new Date(filteredData.admDate).toLocaleDateString()}
                </span>
              </div>

              {/* Column 2 */}
              <div>
                <label className="font-bold block">Email</label>
                <span className="text-gray-600">{filteredData.email}</span>

                <label className="font-bold block mt-2">Address</label>
                <span className="text-gray-600">{filteredData.address}</span>

                <label className="font-bold block mt-2">
                  Admission Approver Name
                </label>
                <div className="flex items-center mt-1">
                  <span className="text-gray-600">{filteredData.approver}</span>
                  <img
                    className="w-4 h-4 ml-2"
                    src={GreenTick}
                    alt="Green Tick"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div>
                <label className="font-bold block">Phone No</label>
                <span className="text-gray-600">{filteredData.mobileNo}</span>

                <label className="font-bold block mt-2">Alt Phone No</label>
                <span className="text-gray-600">{filteredData.altMobileNo}</span>

                <label className="font-bold block mt-2">Branch</label>
                <span className="text-gray-600">{filteredData.branch}</span>
              </div>
            </div>
          </div>
        </div>

        <DocumentAttached filteredData={filteredData}/>
        <EMIDetails filteredData={filteredData}/>
      </div>
    </>
  );
};

export default PersonalDetails;

