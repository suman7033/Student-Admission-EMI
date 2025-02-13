import React, { useEffect, useState } from "react";
import TotalAIcon from "../../img/TotalAIcon.png";
import { BulletList } from "react-content-loader";
import { fetchAdmissions } from "../../Redux/Slices/admission.Slice";
import { useDispatch, useSelector } from "react-redux";

const TotalAdmission = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("");
  const dispatch=useDispatch();
  const totalAdmission = useSelector((state) => state.admissionSlice.totalAdmission);

  useEffect(() => {
    dispatch(fetchAdmissions());
  }, []);

  return (
    <div className="w-52 p-2 rounded-xl bg-white shadow-md">
      <label>Total Admission</label>
      <div className="flex justify-between">
        <label className=" font-semibold text-lg text-[#1ACA0A]">{totalAdmission}</label>
        <img src={TotalAIcon} className=" w-5 h-6 mt-1" />
      </div>
    </div>
  );
};

export default TotalAdmission;
