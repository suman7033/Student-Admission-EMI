import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setShowPic, toogleProfileView } from '../../Redux/sidebarSlice';
import Cookies from 'js-cookie';

const ProfilePop = () => {
     const dispatch=useDispatch();
     const navigate=useNavigate();

     const [PopShow,setPopShow]=useState(false);

     const confirmLogout=()=>{
       Cookies.remove('authToken');
       navigate('/login')
     }
     const AskLogout=()=>{
         setPopShow(true);
      }

      const cancelHandler=()=>{
         setPopShow(false);
      }
      const ProfileHandler=()=>{
        navigate("/profile")
      }
      
       
  return (
    <div className='fixed inset-0 bg-opacity-0' onClick={()=>dispatch(toogleProfileView())}>
    <div onClick={(e) => e.stopPropagation()} className='bg-[#637D9B] absolute rounded-md mt-16 py-5 w-32 right-0 h-24'>
      <div className='flex flex-col text-sm text-white text-center gap-y-3 font-semibold'>
          <label className='cursor-pointer' onClick={ProfileHandler}>View Profile</label>

      <label className='cursor-pointer' onClick={AskLogout}>Logout</label>
      </div>
    </div>
    {/* Pop */}
    { PopShow && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center text-black">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to Logout?</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={cancelHandler}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
     )}
    </div>
  )
}

export default ProfilePop
