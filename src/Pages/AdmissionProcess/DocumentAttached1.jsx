import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pooup from "../Pooup/Pooup";
import { BulletList } from "react-content-loader";
import { togglePopupData, togglePopupView } from "../../Redux/Slices/common.Slice";

const DocumentAttached1 = ({ filteredData }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const PooupView = useSelector((state) => state.commonSlice.PooupView);
  const { isLoading } = useSelector((state) => state.team);

  // Update state when filteredData changes
  useEffect(() => {
    if (filteredData && Array.isArray(filteredData)) {
      setData(filteredData);
    }
  }, [filteredData]);

  const ViewHandler = (title, pic) => {
    console.log("View Handler data", title, pic);
    dispatch(togglePopupView());
    dispatch(togglePopupData({ title, pic }));
  };

  return (
    <div className="bg-white px-2 my-2 rounded-lg shadow-md">
      {PooupView && <Pooup />}

      {/* Header */}
      <div className="flex flex-wrap justify-between font-semibold">
        <label className="w-full sm:w-auto text-base">Document Attached</label>
      </div>

      <div className="overflow-x-auto md:text-base text-center text-sm p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>Pan Card</th>
              <th>Front Aadhar</th>
              <th>Back Aadhar</th>
              <th>Course Name</th>
              <th>Course Price</th>
              <th>Approve Comment</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <BulletList
                    speed={2}
                    width="30vw"
                    height={180}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((val, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="py-1 px-8 text-white rounded-md bg-[#637D9B] hover:bg-[#546B8C] transition"
                      onClick={() => ViewHandler("Pan Card", val.panCard)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="py-1 px-8 text-white rounded-md bg-[#637D9B] hover:bg-[#546B8C] transition"
                      onClick={() => ViewHandler("Front Aadhar Card", val.frontAadhar)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="py-1 px-8 text-white rounded-md bg-[#637D9B] hover:bg-[#546B8C] transition"
                      onClick={() => ViewHandler("Back Aadhar Card", val.backAadhar)}
                    >
                      View
                    </button>
                  </td>
                  <td>{val.course}</td>
                  <td>₹ {val.coursePrice}</td>
                  <td>{val.approverComment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentAttached1;
