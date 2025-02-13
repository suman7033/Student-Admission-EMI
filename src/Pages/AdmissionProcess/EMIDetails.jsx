import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { BulletList } from "react-content-loader";
import { format } from "date-fns";
import {
  createOrUpdateAdmission,
  updateStatus,
} from "../../Redux/Slices/admission.Slice";
import Item from "antd/es/list/Item";

const EMIDetails = ({ filteredData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { isLoading } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);

  const [EMIVisible, setEMIVisible] = useState(false);
  const [EMICount, setEMICount] = useState();
  const [HideComment, setHideComment] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if (filteredData) {
      console.log("filterData", filteredData);
      setId(filteredData._id);
      setFilterData([filteredData]);
    }
    if (filteredData.paymentType === "Installment") {
      setEMIVisible(true);
      console.log("emi count", filteredData.emiCount);
      setEMICount(filteredData.emiCount);
    }
  }, [filteredData]);

  const UpdateHandler = (status) => {
    console.log("status", id + " ", status);
    const updatedData = {
      status: status,
      remarks: comment,
      _id: id,
    };
    dispatch(updateStatus(updatedData));
    if (status === "rejected") {
      navigate("/admission_List");
    }else{
      navigate("/view_admission_details1",{state : filterData});
    }
  };
  return (
    <div className="">
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
                {!EMIVisible && (
                  <th className="text-red-500 line-through">Down Payment</th>
                )}
                {EMIVisible && <th>Down Payment</th>}

                {!EMIVisible && (
                  <th className="text-red-500 line-through">Total EMI</th>
                )}
                {EMIVisible && <th>Total EMI</th>}
                <th>GST Amount</th>
                {!EMIVisible && (
                  <th className="text-red-500 line-through">Pending Amount</th>
                )}
                {EMIVisible && <th>Pending Amount</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                {filterData.length > 0 ? (
                  filterData.map((e, index) => (
                    <>
                      <td>{e.paymentMode}</td>
                      <td>₹{e.totalAmount}</td>
                      <td className="text-green-500 font-bold">
                        {e.paymentType}
                      </td>
                      {EMIVisible && <td>₹{e.downPayment}</td>}
                      {EMIVisible && <td>{e.totalEmi}</td>}
                      <td>₹{e.gstAmount}</td>
                      {EMIVisible && <td>₹{e.pendingAmount}</td>}
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

      {/* EMI Details */}
      <div className="flex w-full my-6">
        {EMIVisible && (
          <div className="overflow-x-auto w-1/2">
            <label className="text-lg font-semibold">EMI Details</label>
            {isLoading ? (
              <BulletList
                speed={2}
                width="30vw"
                height={180}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              />
            ) : (
              <table className="w-5/6 border border-gray-300 border-collapse">
                <thead className="text-center text-white bg-[#254974b8]">
                  <tr>
                    <th className="p-2 border border-gray-300">S.No</th>
                    <th className="p-2 border border-gray-300">
                      Installment Amount
                    </th>
                    <th className="p-2 border border-gray-300">
                      Installment Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterData &&
                  filterData.length > 0 &&
                  filterData[0].installAmount ? (
                    filterData[0].installAmount.map((amount, index) => (
                      <tr key={index} className="text-center">
                        <td className="p-2 border border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-2 border border-gray-300">
                          ₹{amount}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {filterData[0].installDate[index]}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-gray-500">
                        No EMI details available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {HideComment && (
          <div className="w-1/2 pr-2">
            <label className="font-bold">Approver Comment*</label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-20 p-2 border border-gray-300"
            ></textarea>
            <Link to="/admission_list">
              <button className="bg-[#929ca8] text-white w-32 h-9 rounded-md mx-8 my-1.5">
                Back
              </button>
            </Link>
            <button
              className="bg-[#EF4444] text-white w-32 h-9 rounded-md mx-5 my-2"
              onClick={() => UpdateHandler("rejected")}
            >
              Reject
            </button>
            <button
              className="bg-[#1ACA0A] text-white w-32 h-9 rounded-md mx-5 my-2"
              onClick={() => UpdateHandler("approved")}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMIDetails;
