import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { BulletList } from "react-content-loader";

const EMIDetails2 = ({ filteredData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);

  const [EMIVisible, setEMIVisible] = useState(false);
  const [EMICount, setEMICount] = useState(0);

  const UpdateHandler = () => {
    navigate("/admission_list");
   };

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
    <div className=" my-4">
      <ToastContainer />
      {/* EMI Summary */}
      <div className="w-full overflow-x-auto bg-white md:text-base p-4 text-center rounded-lg shadow-md text-sm">
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
              <tr>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((e, index) => (
                    <>
                      <td>{e.paymentMode}</td>
                      <td>₹{e.totalAmount}</td>
                      <td>{e.paymentType}</td>
                      <td>₹{e.downPayment}</td>
                      <td>{e.totalEmi}</td>
                      <td>₹{e.gstAmount}</td>
                      <td>₹ {e.pendingAmount}</td>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className=" text-center text-gray-500">
                      No accounts found
                    </td>
                  </tr>
                )}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white mt-4 p-2 overflow-x-auto md:text-base text-sm">
        <h2 className="text-sm md:text-lg font-semibold mb-1">EMI Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#637D9BB8] text-white">
              <th>S.No</th>
              <th>Insta Amount</th>
              <th>Paid Amount</th>
              <th>Insta Date</th>
              <th>Received EMI Date</th>
              <th>Payment Mode</th>
              <th>Account</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((emi, index) => (
                <tr key={index} className="text-center">
                  <td className="pl-2 pt-2">
                    <div className="border rounded-md border-gray-500 w-14">
                      {index + 1}
                    </div>
                  </td>
                  <td className="pl-4 pt-2">
                    <div className="border rounded-md border-gray-500 w-32">
                      ₹{emi.installAmount}
                    </div>
                  </td>
                  <td className="pl-4 pt-2">
                    <div className="border rounded-md border-gray-500 w-32">
                      ₹{emi.paidAmount}
                    </div>
                  </td>
                  <td className="pt-2">
                    <div className="border rounded-md border-gray-500">
                      {emi.installDate}
                    </div>
                  </td>
                  <td className="pt-2">
                    <div>
                      <input
                        type="date"
                        className="w-40 rounded-md text-center border border-gray-500"
                      />
                    </div>
                  </td>
                  <td className="pl-3 pt-2">
                    <div className="w-48 rounded-md text-center border border-gray-500">
                      <select>
                        <option>Select Payment Method</option>
                        <option>UPI</option>
                        <option>Credit/debit</option>
                        <option>Net Banking</option>
                      </select>
                    </div>
                  </td>
                  <td className=" pt-2">
                    <div className="w-20 ml-5 rounded-md text-center border border-gray-500">
                      <select className="w-20">
                        <option>HDFC</option>
                        <option>PNB</option>
                        <option>SBI</option>
                      </select>
                    </div>
                  </td>
                  <td className="pt-2">
                    <input
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="  Add Comment.."
                      className="border border-gray-500 rounded-md"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500">
                  No EMI details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end gap-4 m-2">
          <Link to="/view_admission_details1">
            <button className="px-7 py-1 rounded-md  bg-[#929ca8] text-white">
              Back
            </button>
          </Link>
          <button
            className="bg-[#637D9B] text-white px-7 py-1 rounded-md"
            onClick={UpdateHandler}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMIDetails2;
