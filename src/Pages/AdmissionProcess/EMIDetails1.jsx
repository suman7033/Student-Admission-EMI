import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BulletList } from "react-content-loader";

const EMIDetails1 = ({ filteredData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);

  const [EMIVisible, setEMIVisible] = useState(false);
  const [EMICount, setEMICount] = useState(0);

  const UpdateHandler=()=>{
    navigate("/view_admission_details2", { state: filteredData });
  }

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      const firstItem = filteredData[0]; // Assuming you are dealing with the first item in the array
      if (firstItem.paymentType === "Installment") {
        setEMIVisible(true);
        setEMICount(firstItem.emiCount);
      }
    }
  }, [filteredData]);

  return (
    <div className="my-2">
      <ToastContainer />

      {/* EMI Summary */}
      <div className="w-full overflow-x-auto bg-white md:text-base p-4 my-2 text-center rounded-lg shadow-md text-sm">
        {isLoading ? (
          <BulletList
            speed={2}
            width="30vw"
            height={180}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          />
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th>Payment Mode</th>
                <th>Total Amount</th>
                <th>Payment Type</th>
                <th>Down Payment</th>
                <th>Total EMI</th>
                <th>GST Amount</th>
                <th>Pending Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((e, index) => (
                  <tr key={index}>
                    <td>{e.paymentMode}</td>
                    <td>₹{e.totalAmount}</td>
                    <td>{e.paymentType}</td>
                    <td>₹{e.downPayment}</td>
                    <td>{e.emiCount}</td>
                    <td>₹{e.gstAmount}</td>
                    <td>₹{e.pendingAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500">
                    No accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {EMIVisible && (
        <div className="bg-white my-2 px-3 overflow-x-auto md:text-base text-sm">
          <h2 className="text-sm md:text-base font-semibold mt-8 mb-1">
            EMI Details
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#637D9BB8] text-white">
                <th className="border">S.No</th>
                <th className="border">Installment Amount</th>
                <th className="border">Installment Date</th>
                <th className="border">EMI Received Date</th>
                <th className="border">Payment Mode</th>
                <th className="border">Status</th>
                <th className="border">Invoice</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((emi, index) => (
                <tr key={index} className="text-center">
                  <td className="border">{index + 1}</td>
                  <td className="border">₹{emi.installAmount}</td>
                  <td className="border">{emi.installDate}</td>
                  <td className="border">{emi.emiReceivedDate}</td>
                  <td className="border">{emi.paymentMode}</td>
                  <td className="border">
                    <div
                      className={`border text-sm h-6 ${
                        emi.addStatus === "pending"
                          ? "bg-[#EF4444] rounded-2xl text-white"
                          : "bg-[#2be769] rounded-full text-white"
                      }`}
                    >
                      {emi.admStatus}
                    </div>
                  </td>
                  <td className="border">
                    <DescriptionIcon
                      fontSize="small"
                      className="cursor-pointer"
                      onClick={() => dispatch(toogleInvoice())}
                    />
                  </td>
                  <td className="border p-1">
                    <button className="hover:underline cursor-pointer mr-2">
                      <WhatsAppIcon fontSize="small" />
                    </button>
                    <button className="hover:underline cursor-pointer">
                      <MailOutlineIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-5 m-2">
            <Link to="/view_admission_details">
              <button className="rounded-md px-7 py-1 bg-[#929ca8] text-white">
                Back
              </button>
            </Link>
               <button onClick={UpdateHandler} className="bg-[#1ACA0A] px-7 py-1 text-white rounded-md">
                Update
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMIDetails1;
