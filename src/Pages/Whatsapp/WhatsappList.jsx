import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BulletList } from "react-content-loader";
import Navbar from "../Navbar/Navbar";
import {
  createOrUpdateWhatsAppMessage,
  deleteWhatsapp,
  fetchWhatsAppMessages,
} from "../../Redux/Slices/whatsapp.Slice";
import DeleteModal from "../../Components/DeleteModal";

const WhatsappList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.whatsappSlice);
  console.log("whatsappSlice data",data);
  const { user } = useSelector((state) => state.auth);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchWhatsAppMessages());
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
      item.title.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const handleEdit = (item) => {
    navigate("/add_whatsapp_message", { state: item });
    console.log("edit data", item);
  };
  const handleDelete = async () => {
    await dispatch(deleteWhatsapp(selectedItem?._id));
    setDeleteModal(false);
    await dispatch(fetchWhatsAppMessages());
  };
  const close = (value) => {
    setDeleteModal(value);
  };
  const ActiveHandler = async (item, status) => {
    const updateStatus = {
      ...item, // Create a shallow copy of the object
      status: status, // Toggle the status
      createdBy: user?._id, // Add or update createdBy
    };

    console.log("whatsapp status", updateStatus);
    try {
      const resultAction = await dispatch(
        createOrUpdateWhatsAppMessage(updateStatus)
      );
       if (createOrUpdateWhatsAppMessage.fulfilled.match(resultAction)) {
        dispatch(fetchWhatsAppMessages());
      } else {

        createOrUpdateWhatsAppMessage.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
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
      <Navbar title={"Whatsapp List"} />
      <div className="p-2 md:p-4">
        <ToastContainer />
        <div className="bg-white p-3 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mt-2 mb-4">
            <input
              type="search"
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
              className="w-1/2 md:w-1/3 shadow-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link to="/add_whatsapp_message">
              <button className="bg-[#637D9B] rounded-md px-4 py-2 text-white hover:bg-[#506A88] transition-colors duration-300">
                New Message
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto text-sm md:text-base text-center">
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
                <thead className="bg-[#B0BDCC]">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item._id} className="bg-white border-y-2">
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>
                          {item.content.length > 10
                            ? `${item.content.substring(0, 8)}...`
                            : item.content}
                        </td>
                        <td>
                          <div className="flex justify-center">
                            <div>
                              <button 
                                className={` text-black text-sm px-4 mr-1 py-1.5 rounded-sm ${
                                  item.status === true 
                                    ? "cursor-not-allowed bg-[#1ACA0A] text-white"
                                    : "bg-[#B0BDCC] text-black"
                                }`}
                                disabled={item.status === true}
                                onClick={() => ActiveHandler(item,true)}
                              >
                                Active
                              </button>
                            </div>
                            {/* &nbsp; */}
                            <div className="absolute bg-white rounded-full w-6 mr-2 mt-1">Or</div>
                            <button
                              className={`text-black text-sm px-4 py-1.5 rounded-sm ${
                                item.status === false
                                  ? "cursor-not-allowed bg-[#fc1201] text-white"
                                  : "bg-[#B0BDCC]"
                              }`}
                              disabled={item.status === false}
                              onClick={() => ActiveHandler(item, false)}
                            >
                              Inactive
                            </button>
                          </div>
                        </td>

                        <td className="py-2 flex justify-center">
                          <EditIcon
                            onClick={() => handleEdit(item)}
                            className="bg-white cursor-pointer mx-2"
                          />
                          <DeleteIcon
                            fontSize="small"
                            className="text-red-500 cursor-pointer mx-2 mt-1"
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedItem(item);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-gray-500 py-4">
                        No messages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsappList;
