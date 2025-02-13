import React from 'react'
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import StoreIcon from "../../../img/StoreIcon.png";
import Cookies from 'js-cookie';

Chart.register(Tooltip, Title, ArcElement, Legend);

const data = {
  labels: [], // No labels needed since we're focusing on the center text
  datasets: [{
    data: [78, 22], // 78% deals, the remaining is 22% (adjust as per your data)
    backgroundColor: [
      '#6366F1', // Blue color for percentage
      '#e6e6e6'  // Light gray for the remaining area
    ],
    hoverOffset: 4,
    cutout: '80%',  // Create the hollow center
    borderWidth: 2  // Remove the border to match the clean look
  }]
};

const plugins = [{
  id: 'centerImage',
  beforeDraw: function (chart) {
    const { ctx, width, height } = chart;
    const image = new Image(); 
    image.src = StoreIcon;  // Set the image source to the imported StoreIcon

    // Calculate the position of the icon in the center of the chart
    const iconSize = 22;  // Adjust icon size as needed
    const xPos = (width - iconSize) / 2;
    const yPos = (height - iconSize) / 1.8;

    image.onload = function () {
      ctx.drawImage(image, xPos, yPos, iconSize, iconSize);  // Draw the image on the canvas
    };
  }
}];

const DealChart = () => {
  const token = Cookies.get('authToken');

  return (
      <div className='w-64 h-24 p-2 flex justify-between bg-white shadow-md rounded-xl'>
        
        <div className='w-20'>
          <Doughnut data={data} plugins={plugins} />
        </div>
        
        <div className='flex flex-col text-center items-center'>
          <div className=' text-[#6B7280] font-semibold text-3xl'>78%</div>
          <div className=''>
            <label className='text-robot text-[#313131]'>Deal This Year</label>
          </div>
        </div>
      </div>
  );
}

export default DealChart;


 