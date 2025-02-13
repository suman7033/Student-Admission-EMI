import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing to manage sidebar state
import VisibilityIcon from "@mui/icons-material/Visibility"; // For view icon
import EditIcon from "@mui/icons-material/Edit"; // For edit icon
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TotalAdmission from "../Dashboard/TotalAdmission";
import Pending from "../Dashboard/Pending";
import PortalAdmission from "../Dashboard/PortalAdmission";
import TotalRevenue from "../Dashboard/TotalRevenue";
import MenuItem from "@mui/material/MenuItem";
import Rejected from "../Dashboard/Rejected";
import { BulletList } from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";
import CustomTextField from "../../Configs/CustomTextField";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // themes
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import { fetchAdmissions } from "../../Redux/Slices/admission.Slice";
import { fetchBranches } from "../../Redux/Slices/branch.Slice";
import { fetchCourses } from "../../Redux/Slices/course.Slice";
import { fetchTeam } from "../../Redux/Slices/team.Slice";

const AdmissionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.admissionSlice);
  const branches = useSelector((state) => state.branchSlice.data);
  const courses = useSelector((state) => state.courseSlice.data);
  const teamData = useSelector((state) => state.team.data);
  const counsellors = useSelector((state) => state.team.data);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    dispatch(fetchAdmissions());
    dispatch(fetchBranches());
    dispatch(fetchCourses());
    dispatch(fetchTeam());
  }, []);

  useEffect(() => {
    if (data?.length > 0 || data?.length === 0) {
      setFilteredData(data);
    }
  }, [data]);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const lowercasedValue = value.toLowerCase().trim();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [openDate1, setOpenDate1] = useState(false);
  const [date1, setDate1] = useState({
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
  const handleDateChange1 = (ranges) => {
    setDate1(ranges.selection); // Properly access the selected range
  };

  const handleClick1 = () => {
    setOpenDate1((prev) => !prev);
  };

  const handleEdit = (item) => {
    navigate("/add_admission", { state: item });
    console.log("edit data", item);
  };
  const ViewHandler = (item) => {
    if (item.admStatus === "approved") {
      // navigate("/view_admission_details1", { state: item });
      console.log("location data check1", item);

      navigate("/view_admission_details1", { state: item });
    } else {
      navigate("/view_admission_details", { state: item });
    }
  };
  const handlerFullAdmission = () => {
    if (openDate === true) {
      setOpenDate(false);
    }
    if (openDate1 === true) {
      setOpenDate1(false);
    }
  };
  //All Filter
  const handleFilterChange = (filterType, value) => {
    // Apply filtering logic
    const filtered = data.filter((item) => {
      switch (filterType) {
        case "approver":
          return item.approver === value;
        case "counsellor":
          return item.counsellor === value;
        case "branch":
          return item.branch === value;
        case "course":
          return item.course === value;
        case "status":
          return item.admStatus === value;
        default:
          return true;
      }
    });

    setFilteredData(filtered);
  };

  console.log("admission get Data", data);
  
  return (
    <div onClick={handlerFullAdmission}>
      <Navbar title={"Admission List"} />
      <div className="h-full p-3">
        <ToastContainer />
        <div className="flex gap-2 flex-wrap justify-evenly md:justify-between pb-2">
          <TotalAdmission />
          <Pending />
          <PortalAdmission />
          <TotalRevenue />
          <Rejected />
        </div>
        <div className="flex flex-col bg-white p-2 rounded-md shadow-md md:grid md:grid-cols-4 gap-2 gap-y-3 md:h-[6.5rem]">
          <CustomTextField
            select
            label="Select Approval"
            onChange={(e) => handleFilterChange("approver", e.target.value)}
            defaultValue=""
            className="bg-[#faf7f7]"
          >
            <MenuItem value="" disabled>
              Select Approver
            </MenuItem>
            {teamData.map((team) => {
              if (team.userType === "Approver") {
                return <MenuItem value={team.name}>{team.name}</MenuItem>;
              }
            })}
          </CustomTextField>
          {/* counsellor */}
          <CustomTextField
            select
            label="Select Counsellor"
            onChange={(e) => handleFilterChange("counsellor", e.target.value)}
            defaultValue=""
            className="bg-[#faf7f7]"
          >
            <MenuItem value="" disabled>
              Select Counsellor
            </MenuItem>
            {teamData.map((team) => {
              if (team.userType === "Counsellor") {
                return <MenuItem value={team.name}>{team.name}</MenuItem>;
              }
            })}
          </CustomTextField>
          {/* branch */}
          <CustomTextField
            select
            onChange={(e) => handleFilterChange("branch", e.target.value)}
            label="Select Branch"
            defaultValue=""
            className="bg-[#faf7f7]"
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
          {/* course */}
          <CustomTextField
            select
            label="Select Course Name"
            onChange={(e) => handleFilterChange("course", e.target.value)}
            defaultValue=""
            className="bg-[#faf7f7]"
          >
            <MenuItem value="" disabled>
              Select Course Name
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course.name}>
                {course.name}
              </MenuItem>
            ))}
          </CustomTextField>

          <div className="mt-2">
            <label className="text-xs px-2 mt-[-1.4rem] absolute font-semibold text-gray-700">
              Select Install Date
            </label>
            <span
              onClick={handleClick}
              className="bg-[#faf7f7] py-2 px-8 border border-gray-400 cursor-pointer"
            >
              {`${format(date.startDate, "MMM dd, yyyy")} to ${format(
                date.endDate,
                "MMM dd, yyyy"
              )}`}
            </span>
            {openDate && (
              <DateRangePicker
                className="w-23 ml-[-31rem] mt-8 absolute"
                ranges={[date]}
                onChange={handleDateChange}
                staticRanges={[]}
                inputRanges={[]}
              />
            )}
          </div>

          <div className="mt-2">
            <label className="text-xs px-2 mt-[-1.4rem] absolute font-semibold text-gray-700">
              Select Admission Date
            </label>
            <span
              onClick={handleClick1}
              className="bg-[#faf7f7] py-2 px-8 border border-gray-400 cursor-pointer"
            >
              {`${format(date1.startDate, "MMM dd, yyyy")} to ${format(
                date1.endDate,
                "MMM dd, yyyy"
              )}`}
            </span>
            {openDate1 && (
              <DateRangePicker
                className="w-0 ml-[-18rem] mt-10 absolute"
                ranges={[date1]}
                onChange={handleDateChange1}
                staticRanges={[]}
                inputRanges={[]}
              />
            )}
          </div>

          <CustomTextField
            select
            label="Select Status"
            onChange={(e) => handleFilterChange("status", e.target.value)}
            defaultValue=""
            className="bg-[#faf7f7]"
          >
            <MenuItem value="" disabled>
              Select Status
            </MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </CustomTextField>

          {/* Search Field */}
          <div className="flex flex-col ">
            {/* <label>Search Here</label> */}
            <div className="md:w-[16.7rem] flex bg-[#faf7f7] border border-gray-400 rounded-lg text-sm">
              <input
                type="search"
                onChange={handleSearch}
                placeholder="Search"
                className="bg-[#faf7f7] w-52 border-none rounded-sm p-2 focus:outline-none"
              />
              <SearchIcon className="mt-2 ml-20 md:ml-7" fontSize="medium" />
            </div>
          </div>
        </div>

        {/* Tab buttons for Today, Follow-up, and All */}
        <div className="font-bold w-64 flex text-sm border justify-between rounded-md">
          <button
            className={`cursor-pointer p-1 w-32 rounded-md text-center ${
              activeTab === "Today"
                ? "text-white bg-[#637D9B]"
                : "text-[#637D9B]"
            }`}
            onClick={() => setActiveTab("Today")}
          >
            Today Follow_up
          </button>

          <button
            className={`cursor-pointer w-24 rounded-md text-center ${
              activeTab === "All" ? "text-white bg-[#637D9B]" : "text-[#637D9B]"
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
        </div>

        {/* Admission Table */}
        <div className=" overflow-x-auto bg-white md:text-base p-1 rounded-lg shadow-md text-sm">
          {isLoading ? (
            <BulletList
              speed={2}
              width="30vw"
              height={180}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            />
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead className="bg-[#637D9B2E]">
                <tr>
                  <th>ID</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Approver</th>
                  <th>Branch</th>
                  <th>Course Name</th>
                  <th>Course Price</th>
                  <th>Adm. Date</th>
                  <th>Adm. Status</th>
                  <th>Payment. Type</th>
                  <th>Install. Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr className=" text-center border-y">
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`data:image/png;base64,${
                            data?.profilePic || "no pic"
                          }`}
                          alt="student"
                          className="h-10 w-10 ml-3 rounded-full"
                        />
                      </td>
                      <td>{data.name}</td>
                      <td>{data.mobileNo}</td>
                      <td>{data.approver}</td>
                      <td>{data.branch}</td>
                       <td>{data.courseDetails.map((e,index)=>{
                        return <div>{e.course}</div>
                      })}</td>
                      <td>₹{data.courseDetails.map((e,index)=>{
                        return <div>{e.coursePrice}</div>
                      })}</td>
                      <td>{new Date(data.admDate).toLocaleDateString()}</td>
                      <div className="flex justify-center items-center mb-3">
                        {data.admStatus === "pending" && (
                          <td className="px-3 py-1 text-xs rounded-xl bg-[#FFBF00]">
                            {data.admStatus}
                          </td>
                        )}
                        {data.admStatus === "rejected" && (
                          <td className="px-3 py-1 text-xs rounded-xl bg-[#ff1100]">
                            {data.admStatus}
                          </td>
                        )}
                        {data.admStatus === "approved" && (
                          <td className="px-3 py-1 text-xs rounded-xl bg-[#2bff00]">
                            {data.admStatus}
                          </td>
                        )}
                      </div>
                      <td>{data.paymentType}</td>
                      <td>{data.installDate}</td>
                      <td className=" flex justify-center mt-3 space-x-2">
                        <VisibilityIcon
                          fontSize="small"
                          onClick={() => ViewHandler(data)}
                          className="text-blue-500 cursor-pointer"
                        />
                        {data.admStatus != "approved" &&
                          data.admStatus != "pending" && (
                            <EditIcon
                              onClick={() => handleEdit(data)}
                              fontSize="small"
                              className="text-green-500 cursor-pointer"
                            />
                          )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className=" text-center text-gray-500">
                      No accounts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-end space-x-2 mt-2">
          {[1, 2, 3, "..."].map((page) => (
            <button
              key={page}
              className={`px-2 py- rounded-full border ${
                activePage === page
                  ? "bg-[#637D9B] text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AdmissionList;
