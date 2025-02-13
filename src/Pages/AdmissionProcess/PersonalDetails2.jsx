import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GreenTick from "../../img/GreenTick.png";
import DocumentAttached2 from "./DocumentAttached2";
import EMIDetails2 from "./EMIDetails2";
import DescriptionIcon from "@mui/icons-material/Description";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NoteIcon from "@mui/icons-material/Note";
import PersonalProfile from "../../img/PersonalDetailsProfile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BulletList } from "react-content-loader";
import { ToastContainer } from "react-toastify";
import {
  toggleCertificateData,
  toggleCertificateView,
  toggleIdCard,
  toggleIdCardView,
  toggleInvoiceData,
  toggleInvoiceView,
} from "../../Redux/Slices/common.Slice";
import Navbar from "../Navbar/Navbar";

const PersonalDetails2 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (location?.state) {
      setFilteredData(location.state);
      setLoading(false);
    } else {
      navigate("/view_addmission_details1");
    }
  }, [location, navigate]);

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
      <div className="p-3">
        <ToastContainer />
        {/* White container for Personal Details */}
        <div className="bg-white py-4 px-5 rounded-lg shadow-md">
          <label className="text-lg font-semibold mb-4 block">
            PERSONAL DETAILS
          </label>
          {isLoading ? (
            <BulletList
              speed={2}
              width="30vw"
              height={180}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            />
          ) : (
            <div className=" flex flex-col md:flex-row justify-evenly items-center gap-10">
              {/* Left side - Profile image */}
              {filteredData.length > 0 ? (
                filteredData.map((e, index) => (
                  <>
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
                        <span className="text-gray-600">Female</span>

                        <label className="font-bold block">Approver Name</label>
                        <div className="flex items-center mt-1">
                          <span className="text-gray-600">{e.approver}</span>
                          <img
                            className="w-4 h-4 ml-2"
                            src={GreenTick}
                            alt="Green Tick"
                          />
                        </div>

                        <label className="font-bold block">Id Card</label>
                        <div onClick={idCardHandler}>
                          <NoteIcon className="cursor-pointer ml-4" />
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div>
                        <label className="font-bold block">Email</label>
                        <span className="text-gray-600">{e.email}</span>

                        <label className="font-bold block">Address</label>
                        <span className="text-gray-600">{e.address}</span>

                        <label className="font-bold block">
                          Counselor Name
                        </label>
                        <span className="text-gray-600">{e.counsellor}</span>
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
                      <div>
                        <label className="font-bold block">Alt Phone No</label>
                        <span className="text-gray-600">{e.altMobileNo}</span>

                        <label className="font-bold block">
                          Admission Date
                        </label>
                        <span className="text-gray-600">
                          {new Date(e.admDate).toLocaleDateString()}
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
                  </>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          )}
        </div>

        <DocumentAttached2 filteredData={filteredData} />
        <EMIDetails2 filteredData={filteredData} />
      </div>
    </>
  );
};

export default PersonalDetails2;
