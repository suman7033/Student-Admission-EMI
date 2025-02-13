import React, { useEffect, useState } from "react";
import PendingIcon from "../../img/PendingIcon.png";
import { BulletList } from "react-content-loader";
import { fetchAdmissions } from "../../Redux/Slices/admission.Slice";
import { useDispatch, useSelector } from "react-redux";

const Rejected = () => {
  const [loading, setLoading] = useState(true);
  const rejected = useSelector((state) => state.admissionSlice.rejected);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmissions());
  }, []);

  return (
    <div className="w-52 p-2 rounded-xl bg-white shadow-md">
      <label>Rejected Approval</label>
      <div className="flex justify-between">
        <label className="font-semibold text-lg text-[#f50202]">
          {rejected}
        </label>
        <img src={PendingIcon} className="h-5 w-5 mt-1" />
      </div>
    </div>
  );
};

export default Rejected;
