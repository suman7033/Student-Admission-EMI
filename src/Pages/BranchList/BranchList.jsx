import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Link ,useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BulletList } from "react-content-loader";
import Navbar from "../Navbar/Navbar";
import DeleteModal from "../../Components/DeleteModal";
import { deleteBranch, fetchBranches } from "../../Redux/Slices/branch.Slice";

const BranchList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.branchSlice);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    dispatch(fetchBranches());
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
    navigate("/add_branch", { state: item });
    console.log("edit data", item);
  };

  const handleDelete = async () => {
    await dispatch(deleteBranch(selectedItem?._id));
    setDeleteModal(false);
    await dispatch(fetchBranches());
  };
  const close = (value) => {
    setDeleteModal(value);
  };

  return (
    <>
    {deleteModal && (
        <DeleteModal
          page={"Branch"}
          item={selectedItem}
          handleDelete={handleDelete}
          close={close}
        />
      )}
      <Navbar title={"Branch List"} />
      <ToastContainer/>
      <div className="h-16 bg-[#637D9B80] m-3 p-2 md:p-4 flex justify-between items-center rounded-md">
        <div>
          <h1 className="md:text-xl text-white font-semibold">Branch List</h1>
        </div>

        <div className="flex gap-2 md:gap-5">
          <div className="bg-white flex border border-[#d6d3d3] rounded-lg">
            <input
              type="search"
              placeholder="  Search"
              onChange={handleSearch}
              className="w-24 p-2 md:w-56 border-none rounded-lg focus:outline-none"
            />
            <SearchIcon className="mt-2 md:mt-2 md:mr-1" fontSize="medium" />
          </div>
          <Link to="/add_branch">
            <button className=" bg-[#637D9B] text-white p-2 md:py-2 rounded-md">
              Add Branch
            </button>
          </Link>
        </div>
      </div>

      {/* Branch List Table */}
      <div className="overflow-x-auto m-3 bg-white p-2 text-sm rounded-md shadow">
        {isLoading ? (
          <BulletList
            speed={2}
            width="30vw"
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
                <th>Branch Name</th>
                <th>GST No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((branch, index) => (
                  <tr className="text-center border-t" key={branch._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(branch.createdAt).toLocaleDateString()}</td>
                    <td>{branch.name}</td>
                    <td>{branch.gstNo}</td>
                    <td className="pt-1 flex justify-center">
                      <EditIcon
                        onClick={() =>  handleEdit(branch)}
                        className="bg-white cursor-pointer"
                        fontSize="small"
                      />
                      <DeleteIcon
                        fontSize="small"
                        className="cursor-pointer ml-3 text-red-500"
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedItem(branch);
                        }}
                      />
                    </td>
                  </tr>
                ))
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
    </>
  );
};

export default BranchList;
