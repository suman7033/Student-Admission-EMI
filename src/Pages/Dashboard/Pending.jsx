import React, { useEffect, useState } from "react";
import PendingIcon from "../../img/PendingIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { BulletList } from "react-content-loader";
import { fetchAdmissions } from "../../Redux/Slices/admission.Slice";

const Pending = () => {
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState("");
  const pendingCount = useSelector((state) => state.admissionSlice.pending);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmissions());
  }, []);
  console.log("pending data",pendingCount);

  return (
    <div className="w-52 p-2 rounded-xl bg-white shadow-md">
      <label>Pending For Approval</label>
      <div className="flex justify-between">
        <label className="font-semibold text-lg text-[#1ACA0A]">
          {pendingCount}
        </label>
        <img src={PendingIcon} className="h-5 w-6 mt-1" />
      </div>
    </div>
  );
};

export default Pending;
