import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pooup from "../Pooup/Pooup";
import { BulletList } from "react-content-loader";
import { togglePopupData, togglePopupView } from "../../Redux/Slices/common.Slice";

const DocumentAttached = ({ filteredData }) => {
  const dispatch = useDispatch();
  const [frontAadhar, setFrontAadhar] = useState("");
  const [backAadhar, setBackAadhar] = useState("");
  const [panCard, setPanCard] = useState("");
  const PooupView = useSelector((state)=>state.commonSlice.PooupView);
  const { isLoading } = useSelector((state) => state.team);

  useEffect(() => {
    if (filteredData) {
      setFrontAadhar(filteredData.frontAadhar);
      setBackAadhar(filteredData.backAadhar);
      setPanCard(filteredData.panCard);
    }
  }, [filteredData]);

  const ViewHandler = (title, pic) => {
    console.log("view Handler data", title, pic);
    dispatch(togglePopupView());
    dispatch(togglePopupData({title,pic}))
  };

  return (
    <div className="bg-white px-2  mb-3 rounded-lg shadow-md">
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
              <th>Front Adhar</th>
              <th>Back Adhar</th>
              <th>Course Name</th>
              <th>Course Price</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <BulletList
                speed={2}
                width="30vw"
                height={180}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              />
            ) : (
              <tr>
                <td>
                  <button
                    className="py-1 px-8 text-white rounded-md bg-[#637D9B] hover:bg-[#546B8C] transition"
                    onClick={() => ViewHandler("Pan Card", panCard)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="py-1 px-8 text-white rounded-md bg-[#637D9B] hover:bg-[#546B8C] transition"
                    onClick={() => ViewHandler("Front Adhar Card", frontAadhar)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="py-1 px-8 text-white rounded-md bg-[#637D9B] hover:bg-[#546B8C] transition"
                    onClick={() => ViewHandler("Back Adhar Card", backAadhar)}
                  >
                    View
                  </button>
                </td>
                <td>{filteredData.course}</td>
                <td>{filteredData.price || "0"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentAttached;
