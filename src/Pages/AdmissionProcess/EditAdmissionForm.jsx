import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Cookies from 'js-cookie';
import { ToastContainer,toast } from 'react-toastify';
import CustomTextField from '../CustomCss/CustomTextField';

const EditAdmissionForm = () => {

   const [EmiCount,setEmiCount]=useState(0);
   const [CourseCount, SetCourseCount]=useState(0);
   const [EmiOption, setEmiOption]=useState(false);
   const token = Cookies.get('authToken');
   const navigate=useNavigate();
   const hostUrl=useSelector((state)=>state.sidebar.host);
   

   //setDropDown
   const [dropDownBranch,setDropDownBranch]=useState([]);
   const [dropDownmainSource, setDropDownMainSource]=useState([]);
   const [dropDownSubSource,setDropDownSubSourceList]=useState([]);
   const [dropDownCourseList,setDropDownCourseList]=useState([])
   const [dropDownCounsellor,setDropDownCounsellor]=useState([]);
   const [dropDownAccount, setDropDownAccount]=useState([]);
   const [dropDownApprover, setDropDownApprover]=useState([]);
   const [coursePrice,setCoursePrice]=useState("");
   
   
   useEffect(()=>{
           BranchfetchHandler();
           MainSourceFetchHandler();
           SubSourceFetchHandler();
           CourseFetchHandler();
           FetchCounsellor();
           FetchApprover();
           AccountFetchHandler();
   },[])

   const FetchCounsellor=async()=>{
       try{
         const response=await fetch(`${hostUrl}/team/list/counsellor`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Specify JSON if needed
            "Authorization": `Bearer ${token}` // Pass token in Authorization header
          },
         });
         const data=await response.json();
            setDropDownCounsellor(data);
       }catch(err){
         console.log(err);
       }
   }
   const FetchApprover=async()=>{
     try{
       const response=await fetch(`${hostUrl}/team/list/approver`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Specify JSON if needed
          "Authorization": `Bearer ${token}` // Pass token in Authorization header
        },
       });
       const data=await response.json();
         setDropDownApprover(data);
     }catch(err){
       console.log(err);
     }
   }
   const CourseFetchHandler=async()=>{
     try {
           const response = await fetch(`${hostUrl}/course/list`,{
             method: 'GET',
             headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
             },
           });
           const CourseRes = await response.json();
           setDropDownCourseList(CourseRes);
         } catch (error) {
           console.error(error);
           toast.error('An error occurred while fetching courses.');
         } 
   }
   const SubSourceFetchHandler=async()=>{
     try {
           const response = await fetch(`${hostUrl}/sub_source/list`,{
             method: 'GET',
             headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
             },
           });
           const subsourceRes = await response.json();
           setDropDownSubSourceList(subsourceRes);
         } catch (error) {
           console.error('Error fetching sub-source data:', error);
           toast.error('Failed to fetch sub-source data.');
         }
   }
   const MainSourceFetchHandler = async () => {
     try {
       const response = await fetch(`${hostUrl}/source/list`,{
         method: 'GET',
         headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
         },
       });
       const mainSourceRes = await response.json();
       setDropDownMainSource(mainSourceRes);
     } catch (error) {
       console.error(error);
       toast.error('An error occurred while fetching sources.');
     }
   };
   const BranchfetchHandler = async () => {
     try {
       const response = await fetch(`${hostUrl}/branch/list`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
       });
       const res = await response.json();
       console.log("branch fetch",res);
       setDropDownBranch(res);
     } catch (error) {
       console.error(error);
     }
   };
   const AccountFetchHandler=async()=>{
     try {
       const response = await fetch(`${hostUrl}/account/list`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
       });
       const res = await response.json();
       console.log("account fetch",res);
       setDropDownAccount(res);
     } catch (error) {
       console.error(error);
     }
   }
   //course price default
   const getCoursePrice = async (courseName) => {
     try {
       const response = await fetch(`${hostUrl}/course/price`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ courseName }), // Sending the course name in the body
       });
   
       if (!response.ok) {
         throw new Error('Failed to fetch course price');
       }
   
       const data = await response.json();
       console.log('Course Price:', data);
       // setDropDownCoursePrice(data.price);
       setCoursePrice(data.price);
     } catch (error) {
       console.error(error);
     }
   };

     const handleEmiCount=(e)=>{
      const count=e.target.value;
        setEmiCount(count>0 ? count: 0);
     }
     const CoursePlusHandler=(e)=>{
        SetCourseCount(CourseCount+1);
     }
     const CourseMinusHandler=()=>{
       SetCourseCount(CourseCount-1);
     }

     const SelectPaymentHandler=(val)=>{
        const paymentType=val.target.value;
        if(paymentType == 'Installment'){
           setEmiOption(true);
        }else{
          setEmiOption(false);
        }
     }

return (
    <div className='p-1 w-screen md:w-full' >
      <ToastContainer/>
      {/* Form Content */}
      <div className="bg-white p-2 my-2 rounded-lg shadow-md">
        {/* Personal Details Section */}
        <h3 className="text-lg font-semibold mb-1 text-[#637D9B]">Personal Details</h3>
        
        <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
         <CustomTextField variant="outlined" label="Enter Enroll No." className='bg-[#faf7f7]' type="number"></CustomTextField>

         <CustomTextField label="Enter Adm Date" type="date" className='bg-[#faf7f7]'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}>
         </CustomTextField>

         <CustomTextField variant="outlined" label="Enter Your Name" className='bg-[#faf7f7]' type="text"></CustomTextField>

         <CustomTextField variant="outlined" label="Enter Mobile No." className='bg-[#faf7f7]' type="number"></CustomTextField>

         <CustomTextField variant="outlined" label="Enter Alt Mobile No" className='bg-[#faf7f7]' type="number"></CustomTextField>

         <CustomTextField select label="Select Branch" defaultValue="" className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Branch</MenuItem>
           {dropDownBranch.map((branch) => (
            <MenuItem key={branch._id} value={branch.BranchName} >
               {branch.BranchName}
            </MenuItem>
           ))}
        </CustomTextField>

        <CustomTextField select label="Select Counsellor" defaultValue="" className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Counsellor</MenuItem>
           {dropDownCounsellor.map((team)=>(
              <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
             ))}
        </CustomTextField>
        
        <CustomTextField variant="outlined" label="Enter Your Email" className='bg-[#faf7f7]' type="email"></CustomTextField>

        <CustomTextField select label="Select Main Source" defaultValue="" className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Main Source</MenuItem>
           {dropDownmainSource.map((source)=>(
            <MenuItem key={source._id} value={source.SourceName} >{source.SourceName}</MenuItem>
           ))}
        </CustomTextField>

        <CustomTextField select label="Select Sub Source" defaultValue="" className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Sub Source</MenuItem>
           {dropDownSubSource.map((sub)=>(
              <MenuItem key={sub._id} value={sub.SubSourceName} >{sub.SubSourceName}</MenuItem>
            ))}
        </CustomTextField>
        {/* Address */}
        <CustomTextField id="outlined-multiline-flexible"label="Enter Your Address" className='md:w-[35rem] bg-[#faf7f7]' multiline maxRows={4}>
        </CustomTextField>

        </div>
        {/* upload Field */}
        <div className='flex flex-col md:flex-row gap-3 md:justify-start mt-1 text-sm'>
        <div className="flex flex-col">
            <label>Upload Profile Pic*</label>
            <input type="file" className="border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]" />
        </div>
        <div className="flex flex-col">
            <label>Upload PAN Card*</label>
            <input type="file" className="border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]" />
        </div>
        <div className="flex flex-col">
            <label>Upload Front Side Of Aadhar Card*</label>
            <input type="file" className="border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]" />
        </div>
        <div className="flex flex-col">
            <label>Upload Back Side Of Aadhar Card*</label>
            <input type="file" className="border border-gray-400 rounded-lg p-1.5 bg-[#faf7f7]" />
        </div>

        </div>
        {/* Course and Price */}
         <div className='flex flex-col md:flex-row gap-3 mt-4'>
        <CustomTextField onChange={(e)=>{
          getCoursePrice(e.target.value);
        }} select label="Select Course Name" defaultValue="" className='bg-[#faf7f7] md:w-[17rem]'>
           <MenuItem value="" disabled>Select Course Name</MenuItem>
           {dropDownCourseList.map((course)=>(
             <MenuItem key={course._id} value={course.CourseName} >{course.CourseName}</MenuItem>
           ))}
        </CustomTextField>
        <div>
          <CustomTextField value={coursePrice} variant="outlined" label="Enter Course Price" className='bg-[#faf7f7] w-[20rem] md:w-64' type="number">
          </CustomTextField>
          <AddIcon fontSize='medium' onClick={CoursePlusHandler} className='text-white mt-2 ml-1 cursor-pointer bg-gray-400 rounded-md'/>
        </div>

        <CustomTextField select label="Select Approval" defaultValue="" className='bg-[#faf7f7] md:w-64'>
           <MenuItem value="" disabled>Select Approval</MenuItem>
           {dropDownApprover.map((team)=>(
             <MenuItem key={team._id} value={team.name} >{team.name}</MenuItem>
           ))}
        </CustomTextField>
        </div>
        {/* Add Course and Price */}
        {Array.from({ length: CourseCount }).map((_, index) => (
         <div key={index} className=' flex flex-col md:flex-row gap-5 pt-4'>
            <CustomTextField select label="Select Course Name" defaultValue="" className='bg-[#faf7f7] md:w-64'>
              <MenuItem value="" disabled>Select Course Name</MenuItem>
              {dropDownCourseList.map((course)=>(
               <MenuItem key={course._id} value={course.CourseName} >{course.CourseName}</MenuItem>
              ))}
           </CustomTextField>
           <div className=''>
            <CustomTextField variant="outlined" label="Enter Course Price" className='bg-[#faf7f7] md:w-60' type="number">
            </CustomTextField>
            <RemoveIcon fontSize='medium' onClick={CourseMinusHandler} className='text-white mt-2 ml-1 cursor-pointer bg-gray-400 rounded-md'/>
           </div>
         </div>
        ))} 
      </div>

      {/* Courses & EMI Section */}
      <div className="bg-white px-3 pb-1 rounded-lg shadow-md">
        <h3 className="text-lg mb-2 font-semibold text-[#637D9B]">Courses & EMI</h3>
        
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
        <CustomTextField select label="Select Payment Type" defaultValue="" onChange={SelectPaymentHandler} className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Payment Type</MenuItem>
           <MenuItem value="Full">Full</MenuItem>
           <MenuItem value="Installment">Installment</MenuItem>
        </CustomTextField>
        
        <CustomTextField select label="Select Payment Mode" defaultValue="" className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Payment Mode</MenuItem>
           <MenuItem value="Net Banking">Net Banking</MenuItem>
           <MenuItem value="debit/Credit Card">Debit/Credit Card</MenuItem>
           <MenuItem value="UPI">UPI</MenuItem>
        </CustomTextField>
        
        <CustomTextField variant="outlined" label="Enter Down Payment" className='bg-[#faf7f7]' type="text">
        </CustomTextField>

        <CustomTextField variant="outlined" label="Enter Remarks" className='bg-[#faf7f7]' type="text">
        </CustomTextField>

        {EmiOption ? <CustomTextField variant="outlined" label="Enter No. of EMI" onChange={handleEmiCount} className='bg-[#faf7f7]' type="number">
        </CustomTextField>: null}
        
        <CustomTextField select label="Select Payment Account" defaultValue="" required className='bg-[#faf7f7]'>
           <MenuItem value="" disabled>Select Payment Account</MenuItem>
           {dropDownAccount.map((account)=>(
               <MenuItem key={account._id} value={account.AccountHolderName}>{account.AccountHolderName} ({account.BankName})</MenuItem>
           ))}
        </CustomTextField>
        </div>

           
        {Array.from({ length: EmiCount }).map((_, index) => (
          <div key={index} className='flex mt-4 gap-4 w-[34rem]'>
             <CustomTextField variant="outlined" label="Enter Installment Amt" className='bg-[#faf7f7] w-[16rem]' type="text">
             </CustomTextField>
             <CustomTextField variant="outlined" label="Enter Installment Date" className='bg-[#faf7f7] w-[16.5rem]' type="number">
             </CustomTextField>
          </div>
        ))} 
        {/* Submit and Back Button */}
        <div className="flex justify-end mt-2 mb-2">
          <Link to='/admission_list'>
          <div className='mr-5'>
          <button className='bg-[#97acc4] py-2 px-5 rounded-md text-white'>Back</button>
          </div>
          </Link>
          <Link to='/admission_list'>
          <button className="bg-[#637D9B] text-white px-4 py-2 rounded-md">Update approval</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditAdmissionForm;
