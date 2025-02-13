import React,{ useEffect,useState } from 'react'
import Tranding from "../../img/Tranding.png";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useSelector } from 'react-redux'; // Importing to manage sidebar state
import Cookies from 'js-cookie';
import {BulletList} from 'react-content-loader';
import { fetchAdmissions } from "../../Redux/Slices/admission.Slice";

const TotalRevenue = () => {
  const token = Cookies.get('authToken');
  const [loading, setLoading] = useState(true);
  // const hostUrl=useSelector((state)=>state.sidebar.host);
  const [totalRevenue, setTotalRevenue]=useState("");

  // useEffect(()=>{
  //     fetchHandler();
  //   },[])
  
    const fetchHandler=async()=>{
      setLoading(true);
      try{
        const res=await fetch(`${hostUrl}/admission/total_revenue`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        const data=await res.json();
        console.log(data);
        setTotalRevenue(data.totalRevenue);
        setLoading(false);
      }catch(error){
        console.log(error);
  
      }
    }

  return (
      <div className='w-52 p-2 rounded-xl bg-white border shadow-md'>
        <label>Total Revenue</label>
        <div className='flex justify-between'>
          <div>
          <label className="font-semibold text-lg text-[#1ACA0A]">₹ {totalRevenue}</label>
          </div>
          <img src={Tranding} className='w-5 h-5 mt-1'/>
        </div>
      </div>
  )
}

export default TotalRevenue
