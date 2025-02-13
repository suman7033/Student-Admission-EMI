import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // To manage sidebar state
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import SearchIcon from "@mui/icons-material/Search";
import ToggleOnIcon from "@mui/icons-material/ToggleOn"; // Toggle for status ON
import ToggleOffIcon from "@mui/icons-material/ToggleOff"; // Toggle for status OFF
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { BulletList } from "react-content-loader";
import {
  createOrUpdateTeamList,
  fetchTeam,
  statusUpdate,
} from "../../Redux/Slices/team.Slice";
import VisibilityIcon from "@mui/icons-material/Visibility"; // For view icon
import getImageSource from "../../Components/getImageSource"; // Import the correct function

const TeamList = () => {
  const { data, isLoading } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
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

  const handleEdit = (item) => {
    navigate("/add_team", { state: item });
    console.log("edit data", item);
  };
  const StatusHandler = async (item, status) => {
    console.log("update status data before hit api",item);
    const updateStatus={
      status:status,
      id: item._id,
    }
    try {
      const resultAction = await dispatch(statusUpdate(updateStatus));
      dispatch(fetchTeam());
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred!");
    }
  };
  const ViewHandler = (item) => {
    console.log("view item",item);
    navigate("/view_team", { state: item });
    
  };
  return (
    <>
      <Navbar title={"Team List"} />
      <div className="p-2 ">
        <ToastContainer />
        {/* Team List Header */}
        <div className=" h-16 bg-[#637D9B80] p-2 md:mb-2 md:p-4 flex justify-between items-center rounded-md">
          <h1 className=" md:text-xl text-white font-semibold">Team List</h1>
          <div className="flex gap-2 md:gap-5">
            <div className=" bg-white flex border px-2 border-[#d6d3d3] rounded-lg">
              <input
                type="search"
                placeholder="  Search"
                onChange={handleSearch}
                value={search}
                className="w-24 md:w-56 border-none rounded-lg md:p-2 focus:outline-none"
              />
              <SearchIcon className="m-1 md:mt-2" fontSize="medium" />
            </div>
            <Link to="/add_team">
              <button className=" bg-[#637D9B] text-white text-sm w-20 md:w-28 p-2 md:mt-1 rounded-md">
                Add User
              </button>
            </Link>
          </div>
        </div>

        {/* Team List Table */}
        <div className="overflow-x-auto bg-white text-sm md:text-base rounded-md shadow-md p-1">
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
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Phone No.</th>
                  <th>Designation</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((team, index) => {
                    const imageSrc = getImageSource(team.userPic); // Call the function for each team item

                    return (
                      <tr key={team._id} className="text-center border-y">
                        <td>{index + 1}</td>
                        <td>
                          {team.userPic ? (
                            <img
                              src={imageSrc}
                              alt="Profile"
                              className="ml-1 md:ml-12 h-12 w-12 rounded-full"
                            />
                          ) : (
                            <p className="ml-3 md:ml-0">No Image</p>
                          )}
                        </td>
                        <td>{team.name}</td>
                        <td>{team.email}</td>
                        <td>{team.mobileNo}</td>
                        <td>{team.designation}</td>
                        <td>{team.branch}</td>
                        <td className="py-1">
                          {team.status == true ? (
                            <ToggleOnIcon
                              fontSize="large"
                              className="text-green-500 cursor-pointer"
                              onClick={() => StatusHandler(team, false)} // Update status to false
                            />
                          ) : (
                            <ToggleOffIcon
                              fontSize="large"
                              className="text-gray-500 cursor-pointer"
                              onClick={() => StatusHandler(team, true)} // Update status to true
                            />
                          )}
                        </td>

                        <td className=" py-3 flex justify-center gap-2">
                          <VisibilityIcon
                            fontSize="small"
                            onClick={() => ViewHandler(team)}
                            className="text-blue-500 cursor-pointer"
                          />
                          <EditIcon fontSize="small"
                            onClick={() => handleEdit(team)}
                            className="text-green-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-500">
                      No accounts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamList;
