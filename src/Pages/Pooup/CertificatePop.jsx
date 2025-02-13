import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCertificateView } from "../../Redux/Slices/common.Slice";
import CloseIcon from '@mui/icons-material/Close';

const CertificatePop = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="relative h-screen inset-0 bg-black bg-opacity-30 flex justify-center"
      onClick={() => dispatch(toggleCertificateView())}
    >
      <div
        className="relative bg-[#9e9d87] w-[50rem] h-[32rem] rounded-md text-center text-xl p-4"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to parent
      >
        <div className="absolute top-2 right-2">
          <CloseIcon
            className="cursor-pointer"
            onClick={() => dispatch(toggleCertificateView())}
          />
        </div>
        <h1>Certificate Design is not provided; that's why this is blank</h1>
      </div>
    </div>
  );
};

export default CertificatePop;
