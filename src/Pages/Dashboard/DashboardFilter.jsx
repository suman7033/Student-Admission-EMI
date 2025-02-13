import React, { useEffect, useState } from "react";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import CustomTextField from "../../Configs/CustomTextField.js";
import { fetchTeam } from "../../Redux/Slices/team.Slice.jsx";
import { fetchBranches } from "../../Redux/Slices/branch.Slice.jsx";
import { fetchSubSource } from "../../Redux/Slices/subSource.Slice.jsx";
import { fetchMainSource } from "../../Redux/Slices/mainSource.Slice.jsx";
import { fetchCourses } from "../../Redux/Slices/course.Slice.jsx";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // themes
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";

const DashboardFilter = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branchSlice.data);
  const subSources = useSelector((state) => state.subSourceSlice.data);
  const mainSources = useSelector((state) => state.mainSourceSlice.data);
  const courses = useSelector((state) => state.courseSlice.data);
  const approvers = useSelector((state) => state.team.data);

  const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });

    const handleClick = () => {
      setOpenDate((prev) => !prev); // Toggle visibility of DateRangePicker
    };
    const handleDateChange = (ranges) => {
      setDate(ranges.selection); // Properly access the selected range
    };
  useEffect(() => {
    dispatch(fetchTeam("Approver"));
    dispatch(fetchBranches());
    dispatch(fetchSubSource());
    dispatch(fetchMainSource());
    dispatch(fetchCourses());
  }, []);

  const handleAllComponent=()=>{
    if(openDate===true){
      setOpenDate(false);
    }
  }

  return (
    <div onClick={handleAllComponent} className="bg-white flex flex-wrap md:flex-row flex-col justify-evenly items-center text-center rounded-md shadow-sm py-4">
      <CustomTextField
        select
        label="Counsellor"
        defaultValue=""
        className="bg-[#faf7f7] w-full md:w-40"
      >
        <MenuItem value="" disabled>
          Select Counsellor
        </MenuItem>
        {approvers.map((team, index) => (
          <MenuItem key={index} value={team._id}>
            {team.name}
          </MenuItem>
        ))}
      </CustomTextField>
      <ToastContainer />

      <CustomTextField
        select
        label="Select Branch"
        defaultValue=""
        className="bg-[#faf7f7] w-full md:w-40"
      >
        <MenuItem value="" disabled>
          Select Branch
        </MenuItem>
        {branches.map((branch, index) => (
          <MenuItem key={index} value={branch._id}>
            {branch.name}
          </MenuItem>
        ))}
      </CustomTextField>

      <CustomTextField
        select
        label="Main Source"
        defaultValue=""
        className="bg-[#faf7f7] w-full md:w-40"
      >
        <MenuItem value="" disabled>
          Select Main Source
        </MenuItem>
        {mainSources.map((source) => (
          <MenuItem key={source._id} value={source._id}>
            {source.name}
          </MenuItem>
        ))}
      </CustomTextField>

      <CustomTextField
        select
        label="Sub Source"
        defaultValue=""
        className="bg-[#faf7f7] w-full md:w-40"
      >
        <MenuItem value="" disabled>
          Select Sub Source
        </MenuItem>
        {subSources.map((sub, index) => (
          <MenuItem key={index} value={sub._id}>
            {sub.name}
          </MenuItem>
        ))}
      </CustomTextField>

      <CustomTextField
        select
        label="Course"
        defaultValue=""
        className="bg-[#faf7f7] w-full md:w-40"
      >
        <MenuItem value="" disabled>
          Select Course
        </MenuItem>
        {courses.map((course, index) => (
          <MenuItem key={index} value={course._id}>
            {course.name}
          </MenuItem>
        ))}
      </CustomTextField>

      <div className="">
        <label className="text-xs px-2 mt-[-1.4rem] absolute font-semibold text-gray-700">
          Select Admission Date
        </label>
         <span
          onClick={handleClick}
          className="bg-[#faf7f7] py-2 px-2 rounded-md border border-gray-400 cursor-pointer"
        >
          {`${format(date.startDate, "MMM dd yyyy")} - ${format(
            date.endDate,
            "MMM dd yyyy"
          )}`}
        </span>
        {openDate && (
          <DateRangePicker
            className="w-2 ml-[-17rem] mt-8 absolute"
            ranges={[date]}
            onChange={handleDateChange}
            staticRanges={[]}
            inputRanges={[]}
          />
        )}
      </div>
      <FilterAltOffIcon className="cursor-pointer p-2" fontSize="large" />
    </div>
  );
};

export default DashboardFilter;
