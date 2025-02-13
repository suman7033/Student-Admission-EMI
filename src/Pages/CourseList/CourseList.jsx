import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BulletList } from "react-content-loader";
import Navbar from "../Navbar/Navbar";
import { deleteCourse, fetchCourses } from "../../Redux/Slices/course.Slice";
import DeleteModal from "../../Components/DeleteModal";

const CourseList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.courseSlice);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCourses());
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
    navigate("/add_course", { state: item });
    console.log("edit data", item);
  };
  const handleDelete = async () => {
    await dispatch(deleteCourse(selectedItem?._id));
    setDeleteModal(false);
    await dispatch(fetchCourses());
  };
  const close = (value) => {
    setDeleteModal(value);
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          page={"Course"}
          item={selectedItem}
          handleDelete={handleDelete}
          close={close}
        />
      )}
      <Navbar title={"Course List"} />
     <ToastContainer/>
      <div className="p-2 md:p-4">
        <div className="h-16 bg-[#637D9B80] p-2 md:p-4 flex justify-between items-center rounded-md">
          <div>
            <h1 className="md:text-xl text-white font-semibold">Course List</h1>
          </div>

          <div className="flex gap-2 md:gap-5">
            <div className="bg-white flex px-2 border border-[#d6d3d3] rounded-lg">
              <input
                type="search"
                placeholder="  Search"
                value={search}
                onChange={handleSearch}
                className="w-28 md:w-56 border-none rounded-lg focus:outline-none"
              />
              <SearchIcon className="mt-1 md:mt-2 md:mr-1" fontSize="medium" />
            </div>
            <Link to="/add_course">
              <button className=" bg-[#637D9B] text-white p-1 md:p-2 text-sm rounded-md">
                Add Course
              </button>
            </Link>
          </div>
        </div>

        {/* Course List Table */}
        <div className="overflow-x-auto text-sm md:text-base mt-3 bg-white p-2 rounded-md shadow">
          {isLoading ? (
            <BulletList
              speed={2}
              width="50vw"
              height={180}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            />
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date Created</th>
                  <th>Course Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((course, index) => (
                    <tr key={course._id} className="text-center border-t">
                      <td>{index + 1}</td>
                      <td>
                        {new Date(course.dateCreated).toLocaleDateString()}
                      </td>
                      <td>{course.name}</td>
                      <td>Rs. {course.price}</td>
                      <td className="pt-1 flex justify-center">
                        <EditIcon
                          className="cursor-pointer"
                          fontSize="small"
                          onClick={() => handleEdit(course)}
                        />
                        <DeleteIcon
                          fontSize="small"
                          className="cursor-pointer ml-3 mt-1 text-red-500"
                          onClick={() => {
                            setDeleteModal(true);
                            setSelectedItem(course);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500">
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {/* {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this course?</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
      </div>
    </>
  );
};

export default CourseList;
