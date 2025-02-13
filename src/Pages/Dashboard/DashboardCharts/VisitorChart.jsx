import React from 'react'
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import Cookies from 'js-cookie';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const data = {
  labels: ["","","","","","","",""],
  datasets: [
    {
      label: '', // You can set a label or leave it empty
      data: [0,3,1,2,2,3,3,3], // Your actual data points
      borderColor: '#000000', // Line color (black)
      fill: false, // Set to false to have no fill
      tension: 0.5, // This makes the line curved. Set to 0 for straight lines
      pointRadius: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false, // Hide legend if not needed
    }
  },
  scales: {
    x: {
      display: false,  // Hides the x-axis
    },
    y: {
      display: false,  // Hides the y-axis
    }
  }
};
const VisitorChart = () => {
  const token = Cookies.get('authToken');

  return (
       <div className=' h-24 w-64 p-2 flex justify-between bg-white shadow-md rounded-xl'>
        <div className='flex flex-col justify-between'>
        <div className="h-10 w-24" >
          <Line data={data} options={options}/>
        </div>
         
        <div className=''>
            <div className=' text-robot text-[#6B7280] font-semibold text-sm'>10256</div>
            <div className='text-sm text-robot text-[#313131]'>Visitors This Year</div>
        </div>
         
        </div>
         
         <div className='text-[#EF4444] mt-14 font-bold'>1.5%</div>     
    </div>
    )
}

export default VisitorChart
