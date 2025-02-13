import React from 'react';
import IdCardTop from "../../img/IdCard.png";
import Academilcon from "../../img/AcademyIcon.png";
import IdCardProfilePic from "../../img/IdCardProfilePic.png";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIdCardView } from '../../Redux/Slices/common.Slice';
// import { toogleIdCard } from '../../Redux/sidebarSlice';

const IdCard = () => {
  const dispatch = useDispatch();
  const data=useSelector((state)=>state.commonSlice.idCardData);
  console.log("id card recieve slice data",data);

  return (
    <div
      className=" h-screen inset-0 bg-black text-black bg-opacity-30 flex justify-center"
      onClick={() => dispatch(toggleIdCardView())}
    >
      {/* Card container */}
      <div
        className="mt-6 relative bg-gray-300 w-2/3 h-[30rem] p-2 rounded-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Icon */}
        <CloseIcon
          className="absolute top-3 right-3 cursor-pointer text-gray-800"
          onClick={() => dispatch(toggleIdCardView())}
        />

        {/* ID Card Content */}
        <img src={IdCardTop} alt="ID Card Top" />
        <img className="mt-[-5rem] ml-3" src={Academilcon} alt="Academy Icon" />

        <div className="flex mt-12">
          <div className="flex flex-col p-2 w-36 gap-y-3">
            <label className="font-bold">STUDENT ID</label>
            <label className="font-bold">Gender:</label>
            <label className="font-bold">Blood Group:</label>
            <label className="font-bold">Branch:</label>
            <label className="font-bold">EMAIL:</label>
            <label className="font-bold">Phone no.:</label>
            <label className="font-bold">Address:</label>
          </div>

          <div className="flex flex-col gap-y-3 p-2">
            <label>32145698778965</label>
            <label>{data[0].gender}</label>
            <label>O+</label>
            <label>{data[0].branch}</label>
            <label>{data[0].email}</label>
            <label>{data[0].mobileNo}</label>
            <label>
            {data[0].address}
            </label>
          </div>

          <div className="flex ml-52 flex-col">
            <img
              className=" w-52 h-40 rounded-full"
              src={`data:image/png;base64,${
                data[0]?.profilePic || "no pic"
              }`}
              alt="Profile"
            />
            <div className='flex flex-col justify-center items-center text-center'>
            <label className="font-bold text-xl ">{data[0].name}</label>
            <label className="text-sm font-semibold">{data[0].course}</label>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
