import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BulletList } from "react-content-loader";
import Navbar from "../Navbar/Navbar";
import { deleteAccount, fetchAccounts } from "../../Redux/Slices/account.Slice";
import DeleteModal from "../../Components/DeleteModal";

const AccountList = () => {
  const { data, isLoading } = useSelector((state) => state.accountSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchAccounts());
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
      item.bankName.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const handleEdit = (item) => {
    navigate("/add_account", { state: item });
    console.log("edit data", item);
  };
  const handleDelete = async () => {
    await dispatch(deleteAccount(selectedItem?._id));
    setDeleteModal(false);
    await dispatch(fetchAccounts());
  };
  const close = (value) => {
    setDeleteModal(value);
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          page={"Account"}
          item={selectedItem}
          handleDelete={handleDelete}
          close={close}
        />
      )}
      <Navbar title={"Account List"} />
      <div className="p-3 md:m-3 rounded-md bg-white">
        <ToastContainer />
        <div className="h-16 flex bg-[#B0BDCC] md:p-4 p-2 justify-between items-center font-semibold rounded-md">
          <div>
            <label className=" md:text-lg text-white">Account List</label>
          </div>

          <div className="flex gap-2 md:gap-5">
            <div className=" flex border border-[#d6d3d3] px-2 bg-white rounded-lg">
              <input
                type="search"
                placeholder="  Search"
                onChange={handleSearch}
                value={search}
                className="w-24 md:w-52 border-none rounded-lg p-1 focus:outline-none"
              />
              <SearchIcon className="md:mt-2 mt-1" fontSize="medium" />
            </div>
            <Link to="/add_account">
              <button className="px-2 md:px-4 md:py-2 py-1 bg-[#637D9B] rounded-md text-white cursor-pointer">
                Add AC List
              </button>
            </Link>
          </div>
        </div>

        {/* Account table */}
        <div className="overflow-x-auto p-1 text-sm md:text-base">
          {isLoading ? (
            <BulletList
              speed={2}
              width="30vw"
              height={180}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            />
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Account H.Name</th>
                  <th>Bank Name</th>
                  <th>Branch</th>
                  <th>Account Number</th>
                  <th>IFSC CODE</th>
                  <th>Percentage</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((account, index) => (
                    <tr key={account._id} className="border-y text-center">
                      <td>{index + 1}</td>
                      <td>{account.accountHolderName}</td>
                      <td>{account.bankName}</td>
                      <td>{account.branch}</td>
                      <td>{account.accountNo}</td>
                      <td>{account.IFSCCode}</td>
                      <td>{account.percentage}%</td>
                      <td>
                        {new Date(account.createdAt).toLocaleDateString()}
                      </td>
                      <td className="items-center flex justify-center">
                        <EditIcon
                          fontSize="small"
                          className="bg-white cursor-pointer "
                          onClick={() => handleEdit(account)}
                        />
                        <DeleteIcon
                          fontSize="small"
                          className="cursor-pointer text-red-500"
                          onClick={() => {
                            setDeleteModal(true);
                            setSelectedItem(account);
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
      </div>
    </>
  );
};

export default AccountList;
