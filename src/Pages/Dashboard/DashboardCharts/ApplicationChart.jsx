import React from 'react'
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PdfIcon from "../../../img/PdfIcon.png";
import Cookies from 'js-cookie';


Chart.register(Tooltip, Title, ArcElement, Legend);

const data = {
  labels: [], // No labels needed since we're focusing on the center text
  datasets: [{
    data: [60, 22], // 78% deals, the remaining is 22% (adjust as per your data)
    backgroundColor: [
      '#FFBF00', // Blue color for percentage
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
    image.src = PdfIcon;  // Set the image source to the imported StoreIcon

    // Calculate the position of the icon in the center of the chart
    const iconSize = 22;  // Adjust icon size as needed
    const xPos = (width - iconSize) / 2;
    const yPos = (height - iconSize) / 1.8;

    image.onload = function () {
      ctx.drawImage(image, xPos, yPos, iconSize, iconSize);  // Draw the image on the canvas
    };
  }
}];


const ApplicationChart = () => {
  const token = Cookies.get('authToken');

  return (
      <div className='h-24 w-64 flex justify-between p-2 text-center bg-white shadow-md rounded-xl'>
      <div className='w-20'>
          <Doughnut data={data} plugins={plugins} />
      </div>

      <div className=''>
        <div className=' text-robot text-[#6B7280] font-semibold text-3xl'>74%</div>
            <div className=''>
             <label className='text-robot text-sm text-[#313131]'>Application This Year</label>
            </div>
        </div>
      </div>
  )
}

export default ApplicationChart
