import React from 'react'
import { MdCancel } from "react-icons/md";

const DeleteModal = ({item,handleDelete,close,page}) => {
  return (
//     <div className="w-full h-full bg-[rgb(0,0,0,0.5)] fixed top-0 left-0 grid place-items-center z-50">
//     <div className="bg-white rounded-xl h-60 w-1/3">
//         <div className="h-1/6">
//          <button onClick={()=>close(false)} className="float-right m-2"><MdCancel className="text-red-500 text-[30px]"/></button>
//         </div>
//         <div className="flex flex-col justify-between text-center h-4/6 w-full font-semibold">
     
//          <h1 className="text-2xl">Are you sure to Delete this {page} ?</h1>
//          <h3 className="text-xl">{item.name}</h3>

//         <div className="flex justify-evenly">
//          <button onClick={handleDelete} className="bg-white border-2 border-red-500 text-red-500 hover:bg-red-100 rounded-md p-2 px-4">Yes, Delete it</button>
//          <button onClick={()=>close(false)} className="bg-[#517293] text-white rounded-md p-2 px-4">No, Cancel it</button>
//         </div>
//         </div>
//     </div>
// </div>
<div onClick={()=>close(false)} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to Delete this {page}?
              <h3 className="text-xl">{item.name}</h3>

            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={()=>close(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default DeleteModal;