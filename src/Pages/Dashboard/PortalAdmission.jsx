import React, { useEffect, useState } from "react";
import PortalIcon from "../../img/PortalIcon.png";
import { useDispatch, useSelector } from "react-redux"; // Importing to manage sidebar state
import { BulletList } from "react-content-loader";
import { fetchAdmissions } from "../../Redux/Slices/admission.Slice";

const PortalAdmission = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const approved = useSelector((state) => state.admissionSlice.approved);

  useEffect(() => {
    dispatch(fetchAdmissions());
  }, []);

  return (
    <div className="w-52 p-2 rounded-xl bg-white shadow-md">
      <label>Approved Admission</label>
      <div className="flex justify-between">
        <label className="font-semibold text-lg text-[#1ACA0A]">
          {approved}
        </label>
        <img src={PortalIcon} className="h-5 w-6 mt-1" />
      </div>
    </div>
  );
};

export default PortalAdmission;
