import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BulletList} from 'react-content-loader';
import { deleteMainSource, fetchMainSource } from '../../Redux/Slices/mainSource.Slice';
import Navbar from '../Navbar/Navbar';
import DeleteModal from '../../Components/DeleteModal';

const SourceList = () => {
  const {data,isLoading} =useSelector((state)=>state.mainSourceSlice); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  
  useEffect(()=>{
    dispatch(fetchMainSource());
  },[])

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
  navigate("/add_mainSource", { state: item });
  console.log("edit data", item);
};
const handleDelete = async () => {
    await dispatch(deleteMainSource(selectedItem?._id));
    setDeleteModal(false);
    await dispatch(fetchMainSource());
  };
  const close = (value) => {
    setDeleteModal(value);
  };
  
  return (
    <>
     {deleteModal && (
        <DeleteModal
          page={"Main Source"}
          item={selectedItem}
          handleDelete={handleDelete}
          close={close}
        />
      )}
    <Navbar title={"Main Source"}/>
    <ToastContainer/>
    <div className='p-2 md:p-4'>
      <div className="h-16 bg-[#637D9B80] p-2 md:p-4 flex justify-between items-center rounded-md">
         <h1 className="md:text-xl text-white font-semibold">Main Source List</h1>
        <div className='flex gap-2 md:gap-5'>
         <div className="bg-white flex px-2 border border-[#d6d3d3] rounded-lg">
          <input type="search" placeholder="  Search" onChange={handleSearch}
            className="w-28 md:w-56 border-none rounded-lg  focus:outline-none"
          />
          <SearchIcon className="mt-1 md:mt-2 md:mr-1" fontSize="medium" />
        </div>
        <Link to="/add_mainSource">
          <button className=" bg-[#637D9B] text-white md:w-28 p-2 px-2 md:mt-1 text-sm rounded-md">Add Source</button>
          </Link>
         </div>
      </div>

      {/* Source List Table */}
      <div className="overflow-x-auto text-sm md:text-base mt-2 bg-white p-2 rounded-md shadow">
      {isLoading ? (
            <BulletList speed={2}
            width="30vw"
            height={180}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"/>
        ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className=''>
              <th>#</th>
              <th>Date Created</th>
              <th>Source Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((source, index) => (
                <tr key={source._id} className="text-center border-t">
                  <td>{index + 1}</td>
                  <td>{new Date(source.dateCreated).toLocaleDateString()}</td>
                  <td>{source.name}</td>
                  <td>{source.description}</td>
                  <td className="pt-1 flex justify-center">
                    <EditIcon
                      className="cursor-pointer"
                      fontSize="small"
                      onClick={() => handleEdit(source)}
                    />
                    <DeleteIcon
                      fontSize="small"
                      className="cursor-pointer ml-2 text-red-500"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedItem(source);
                      }}
                     />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500">
                  No sources found
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

export default SourceList;
