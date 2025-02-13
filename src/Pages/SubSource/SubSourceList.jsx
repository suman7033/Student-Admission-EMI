import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteSubSource, fetchSubSource } from "../../Redux/Slices/subSource.Slice";
import Navbar from "../Navbar/Navbar";
import TableSkeleton from "../../Components/skeleton/TableSkeleton";
import DeleteModal from "../../Components/DeleteModal";

const SubSourceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state) => state.subSourceSlice);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // In your useEffect:
  useEffect(() => {
    if (loading) {
      dispatch(fetchSubSource());
    }
  }, [loading]);

  // Update the loading state when data is fetched:
  useEffect(() => {
    if (data?.length > 0 || data?.length === 0) {
      setFilteredData(data);
      setLoading(false); // Stop loading once data is available
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
    navigate("/add_sub_source", { state: item });
    console.log("edit data", item);
  };
  const handleDelete = async () => {
      await dispatch(deleteSubSource(selectedItem?._id));
      setDeleteModal(false);
      await dispatch(fetchSubSource());
    };
    const close = (value) => {
      setDeleteModal(value);
    };

  return (
    <>
    {deleteModal && (
        <DeleteModal
          page={"Sub Source"}
          item={selectedItem}
          handleDelete={handleDelete}
          close={close}
        />
      )}
      <Navbar title={"Sub Source List"} />
      <div className="p-2 md:p-4">
        <ToastContainer />
        <div className="h-16 bg-[#637D9B80] p-2 md:p-4 flex justify-between items-center rounded-md">
          <h1 className="md:text-xl text-white font-semibold">
            Sub Source List
          </h1>
          <div className="flex gap-2 md:gap-5">
            <div className="bg-white flex border border-[#d6d3d3] rounded-lg">
              <input
                type="search"
                placeholder="  Search"
                className="w-24 md:w-56 p-2 border-none rounded-lg focus:outline-none"
                value={search}
                onChange={handleSearch}
              />
              <SearchIcon className="mt-1 md:mt-2 md:mr-1" fontSize="medium" />
            </div>
            <Link to="/add_sub_source">
              <button className="bg-[#637D9B] text-white p-2 md:py-2 text-sm rounded-md">
                Add Source
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto text-sm md:text-base mt-3 bg-white p-2 rounded-md shadow">
          {isLoading ? (
            <TableSkeleton rows={5} colSpan={6} />
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Source Name</th>
                  <th>Description</th>
                  <th>Created By</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData.map((item, index) => {
                    const timeAgo = formatTimeDifference(item.createdAt);
                    const createdDate = new Date(
                      item.createdAt
                    ).toLocaleDateString();
                    return (
                      <tr key={item._id} className="text-center border-t">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.subDescription}</td>
                        <td>{item.createdBy}</td>
                        <td>
                          {createdDate} - {timeAgo}
                        </td>
                        <td className="py-2 flex justify-center">
                          <EditIcon
                            onClick={() => {
                              handleEdit(item);
                            }}
                            className="cursor-pointer"
                            fontSize="small"
                          />
                          <DeleteIcon
                            fontSize="small"
                            className="cursor-pointer ml-3 text-red-500"
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedItem(item);
                            }}/>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500">
                      No Sub Sources Found
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

export default SubSourceList;
const formatTimeDifference = (createdAt) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);
  const diffInMilliseconds = currentTime - createdTime;

  const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // Convert milliseconds to minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Convert minutes to hours
  const diffInDays = Math.floor(diffInHours / 24); // Convert hours to days

  if (diffInMinutes < 1) {
    return "Just now"; // If the difference is less than 1 minute
  } else if (diffInMinutes === 1) {
    return "1 mins ago";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInHours === 1) {
    return "1 Hrs ago";
  } else if (diffInHours < 24) {
    return `${diffInHours} Hrs ago`;
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else {
    return `${diffInDays} days ago`;
  }
};
