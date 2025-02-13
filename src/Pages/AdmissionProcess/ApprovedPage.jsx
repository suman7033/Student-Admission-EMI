import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GreenTick from "../../component/img/GreenTick.png";
import DocumentAttached2 from './DocumentAttached2';
import EMIDetails2 from './EMIDetails2';
import DescriptionIcon from '@mui/icons-material/Description';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NoteIcon from '@mui/icons-material/Note';
import Cookies from 'js-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import {BulletList} from 'react-content-loader';
import { toogleCertificateView, toogleIdCard, toogleInvoice } from '../../Redux/sidebarSlice';
import { ToastContainer } from 'react-toastify';
import ApprovedEMIDetails from './ApprovedEMIDetails';
import paymentApprovedPic from "../img/Appr2.png";

const ApprovedPage = () => {
    const token = Cookies.get('authToken');
    const hostUrl=useSelector((state)=>state.sidebar.host);
    const VisibleId=useSelector((state)=>state.sidebar.VisibleId);
    const [admissionData, setAdmissionData]=useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [Approvers,setApprovers]=useState({});
    const [Branchs,setBranchs]=useState({});
    const [Counsellors,setCounsellors]=useState({});

    useEffect(()=>{
        AdmissionListFetch();

        FetchApproverForAdmissionList();
        FetchBranchsForAdmissionList();
        FetchCounsellorForAdmissionList();
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
            console.log("personal Data",data);
            setLoading(false);
            setAdmissionData([data]);
          }catch(err){
            console.log(err);
          }
      }

      const FetchApproverForAdmissionList=async()=>{
          try {
            const res = await fetch(`${hostUrl}/team/list/approver`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            const response = await res.json();
            delete response.password;
            const approversMap = {};
            response.forEach((approver) => {
              approversMap[approver._id] = approver.name;
            });
            setApprovers(approversMap);
          } catch (err) {
            console.error('Error fetching team details:', err);
            return ;
          }
      }
      
      const FetchBranchsForAdmissionList=async()=>{
          try{
            const res =await fetch(`${hostUrl}/branch/list`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              }
            })
            const response=await res.json()
            console.log("branchs",response);
            const BranchMap={};
            response.forEach(branch=>{
              BranchMap[branch._id]=branch.BranchName;
            })
            setBranchs(BranchMap);
          }catch(error){
            console.error('Error fetching branch details:', error);
            return;
          }
      }
    
      const FetchCounsellorForAdmissionList=async()=>{
          try{
            const res =await fetch(`${hostUrl}/team/list/counsellor`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              }
            })
            const response=await res.json();
            const CounsellorMap={};
            response.forEach(counsellor=>{
              CounsellorMap[counsellor._id]=counsellor.name;
            })
            setCounsellors(CounsellorMap);
          }catch(error){
            console.error('Error fetching course details:', error);
            return ;
          }
      }
        
  return (
 <div className='p-3 w-full bg-gray-100'>
      <ToastContainer/>
      {/* White container for Personal Details */}
      <div className="bg-white py-5 px- rounded-lg shadow-md w-full">
        {/* <ArrowBackIcon className='ml-2 cursor-pointer' onClick={()=>navigate("/admission_list")}/> */}
        {/* <label className="text-lg font-semibold mb-4 block">PERSONAL DETAILS</label> */}
        <img className='absolute w-44 mt-[-1.3rem]' src={paymentApprovedPic} />
         {loading ? (
                    <BulletList speed={2}
                     width='30vw'
                     height={180}
                     backgroundColor='#f3f3f3'
                     foregroundColor='#ecebeb'/>
                  ) : (
        <div className="px-4 flex flex-col md:flex-row justify-evenly items-center gap-10">
          {/* Left side - Profile image */}
          {admissionData.length > 0 ? 
            (admissionData.map((e,index)=>(
              <>
          <div className="w-24 sm:w-32 lg:w-56">
            <img 
              className="rounded-full" 
              src={`data:image/png;base64,${e.profilePic}`}
              alt="Profile"
            />
          </div>

          {/* Right side - Personal details */}
          <div className="flex flex-wrap justify-between w-full">
            {/* Column 1 */}
            <div>
              <label className="font-bold block">Name</label>
              <span className="text-gray-600">{e.name}</span>

              <label className="font-bold block">Gender</label>
              <span className="text-gray-600">Female</span>

              <label className="font-bold block">Approver Name</label>
              <div className="flex items-center mt-1">
                <span className="text-gray-600">{Approvers[e.approver]}</span>
                <img className="w-4 h-4 ml-2" src={GreenTick} alt="Green Tick" />
              </div>

              <label className='font-bold block'>Id Card</label>
              <div onClick={()=>dispatch(toogleIdCard("id card"))}><NoteIcon className='cursor-pointer ml-4'/></div>
            </div>

            {/* Column 2 */}
            <div>
              <label className="font-bold block">Email</label>
              <span className="text-gray-600">{e.email}</span>

              <label className="font-bold block">Address</label>
              <span className="text-gray-600">{e.address}</span>

              <label className="font-bold block">Counselor Name</label>
              <span className="text-gray-600">{Counsellors[e.counsellor]}</span>
            </div>

            {/* Column 3 */}
            <div>
              <label className="font-bold block">Phone No</label>
              <span className="text-gray-600">{e.mobileNo}</span>
              
              <label className="font-bold block">Branch</label>
              <span className="text-gray-600">{Branchs[e.branch]}</span>
              
              <div>
              <label className='font-bold'>Invoice</label>
              <div className='ml-3 cursor-pointer' onClick={()=>dispatch(toogleInvoice())}><MailOutlineIcon/></div>
              </div>

            </div>
            <div>
              <label className="font-bold block">Alt Phone No</label>
              <span className="text-gray-600">{e.altMobileNo}</span>

              <label className="font-bold block">Admission Date</label>
              <span className="text-gray-600">{new Date(e.admDate).toLocaleDateString()}</span>
              
              <div>
              <label className='font-bold'>Certificate</label>
              <div className='ml-5 cursor-pointer' onClick={()=>dispatch(toogleCertificateView())}><DescriptionIcon/></div>
              </div>
              
            </div>
          </div>
          </>))
            ): (<p>No data available</p> ) 
          }
        </div>
        )}
      </div>
      <DocumentAttached2/>
      <ApprovedEMIDetails/>
    </div>
  )
}

export default ApprovedPage
