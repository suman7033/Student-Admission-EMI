import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { togglePopupView } from "../../Redux/Slices/common.Slice";


const Pooup = () => {
  const ShowPic = useSelector((state) => state.commonSlice.pic);
  const title = useSelector((state) => state.commonSlice.PooupViewTitle);
  const dispatch = useDispatch();

  const CloseHandler = () => {
    dispatch(togglePopupView());
  };

  return (
    <div onClick={CloseHandler} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Popup Container */}
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        {/* Close Icon */}
        <div className="absolute top-2 right-2">
          <CloseIcon
            // onClick={CloseHandler}
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
          />
        </div>

        {/* Popup Content */}
        <div className="p-4 flex flex-col items-center text-center">
          {/* Title */}
          <label className="mb-4 text-xl font-semibold text-gray-700">
            {title}
          </label>

          {/* Image */}
          <img
            className="w-full h-56 md:h-72 rounded-md object-contain"
            src={`data:image/png;base64,${ShowPic}`}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default Pooup;
