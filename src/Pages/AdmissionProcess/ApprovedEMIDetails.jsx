import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {BulletList} from 'react-content-loader';

const ApprovedEMIDetails = () => {
  const token = Cookies.get('authToken');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const hostUrl=useSelector((state)=>state.sidebar.host);
  const VisibleId=useSelector((state)=>state.sidebar.VisibleId);
  const [admissionData,setAdmissionData]=useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment]=useState("");

  useEffect(()=>{
             AdmissionListFetch();
       },[])
  
       const AdmissionListFetch=async()=>{
        setLoading(true);
          try{
            const response=await fetch(`${hostUrl}/admission/list/${VisibleId}`,{
             method: "GET",
             headers: {
               "Content-Type": "application/json", // Specify JSON if needed
               "Authorization": `Bearer ${token}` // Pass token in Authorization header
             },
            });
            const data=await response.json();
            setLoading(false);
            console.log("Emi Details2",data);
            setAdmissionData([data]);
          }catch(err){
            console.log(err);
          }
       }

  const updateHandler=()=>{
    console.log("comment",comment);
     if(comment===""){
       return (toast.info("Fill the comment Field"));
     }
     navigate('/admission_list')
  }

  return (
    <div className=" my-4">
      <ToastContainer/>
      {/* EMI Summary */}
      <div className="w-full overflow-x-auto bg-white md:text-base p-4 text-center rounded-lg shadow-md text-sm">
        {loading ? (
                              <BulletList speed={2}
                                width='30vw'
                                height={180}
                                backgroundColor='#f3f3f3'
                                foregroundColor='#ecebeb'/>
                          ): (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th>Payment Mode</th>
              <th>Payment Type</th>
              <th>GST Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            {admissionData.length > 0 ? (
                admissionData.map((e, index) =>(
               <>
              <td>{e.paymentMode}</td>
              <td className='text-green-500 font-bold'>{e.paymentType}</td>
              <td>₹{e.gstAmount}</td>
              <td>₹{e.totalAmount}</td>
              </>
            ))
            ):(
            <tr>
              <td colSpan="11" className=" text-center text-gray-500">
               No accounts found
             </td>
            </tr>
            )}
            </tr>
          </tbody>
        </table>)}
      </div>
    </div>
  );
};

export default ApprovedEMIDetails;
