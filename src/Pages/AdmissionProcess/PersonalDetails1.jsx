import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GreenTick from "../../img/GreenTick.png";
import DocumentAttached1 from "./DocumentAttached1";
import EMIDetails1 from "./EMIDetails1";
import { useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NoteIcon from "@mui/icons-material/Note";
import { BulletList } from "react-content-loader";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import {
  toggleCertificateData,
  toggleCertificateView,
  toggleIdCard,
  toggleIdCardView,
  toggleInvoiceData,
  toggleInvoiceView,
} from "../../Redux/Slices/common.Slice";

const PersonalDetails1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true); // Initial state is loading
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    console.log("location data check1",location?.state);
    if (location?.state) {
      setFilteredData([location.state]); // Set data from location state
      setLoading(false); // Stop loading
    } else {
      navigate("/view_admission_details"); // Redirect if no data in state
    }
  }, [location, navigate]);

  if (isLoading) {
    return <BulletList />;
  }

  if (!filteredData) {
    return <p>No data available</p>;
  }
  const idCardHandler = async () => {
    await dispatch(toggleIdCard(filteredData));
    dispatch(toggleIdCardView());
  };
  const InVoiceHandler = async () => {
    await dispatch(toggleInvoiceData(filteredData));
    dispatch(toggleInvoiceView());
  };
  const CertificateHandler = async () => {
    await dispatch(toggleCertificateData(filteredData));
    dispatch(toggleCertificateView());
  };

  return (
    <>
      <Navbar title={"Admission Details"} />
      <div className="p-3 bg-[#EDEDED]">
        <ToastContainer />
        <div className="bg-white py-4 px-5 rounded-lg shadow-md">
          <label className="text-lg font-semibold mb-4 block">
            PERSONAL DETAILS
          </label>
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-10">
            {filteredData.length > 0 ? (
              filteredData.map((e, index) => (
              <React.Fragment key={index}>
                {/* Left side - Profile image */}
                <div className="w-24 sm:w-32 lg:w-56">
                  <img
                    className="rounded-full"
                    src={`data:image/png;base64,${e.profilePic}`}
                    alt="Profile"
                  />
                </div>

                {/* Right side - Personal details */}
                <div className="flex flex-wrap justify-between w-full">
                  {/* Column 1 */}
                  <div>
                    <label className="font-bold block">Name</label>
                    <span className="text-gray-600">{e.name}</span>

                    <label className="font-bold block">Gender</label>
                    <span className="text-gray-600">{e.gender}</span>

                    <label className="font-bold block">Approver Name</label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-600">{e.approverName}</span>
                      <img
                        className="w-4 h-4 ml-2"
                        src={GreenTick}
                        alt="Green Tick"
                      />
                    </div>

                    <label className="font-bold block">Id Card</label>
                    <NoteIcon
                      className="cursor-pointer ml-4"
                      onClick={idCardHandler}
                    />
                  </div>

                  {/* Column 2 */}
                  <div>
                    <label className="font-bold block">Email</label>
                    <span className="text-gray-600">{e.email}</span>

                    <label className="font-bold block">Address</label>
                    <span className="text-gray-600">{e.address}</span>

                    <label className="font-bold block">Counselor Name</label>
                    <span className="text-gray-600">{e.counselorName}</span>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <label className="font-bold block">Phone No</label>
                    <span className="text-gray-600">{e.mobileNo}</span>

                    <label className="font-bold block">Branch</label>
                    <span className="text-gray-600">{e.branch}</span>

                    <div>
                      <label className="font-bold">Invoice</label>
                      <div
                        className="ml-3 cursor-pointer"
                        onClick={InVoiceHandler}
                      >
                        <MailOutlineIcon />
                      </div>
                    </div>
                  </div>

                  {/* Column 4 */}
                  <div>
                    <label className="font-bold block">Alt Phone No</label>
                    <span className="text-gray-600">{e.altMobileNo}</span>

                    <label className="font-bold block">Admission Date</label>
                    <span className="text-gray-600">
                      {new Date(e.admissionDate).toLocaleDateString()}
                    </span>

                    <div>
                      <label className="font-bold">Certificate</label>
                      <div
                        className="ml-5 cursor-pointer"
                        onClick={CertificateHandler}
                      >
                        <DescriptionIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          ):(<p>No Data available</p>
          )}
          </div>
        </div>

        {/* Document Section */}
        <DocumentAttached1 filteredData={filteredData} />
        <EMIDetails1 filteredData={filteredData} />
      </div>
    </>
  );
};

export default PersonalDetails1;
