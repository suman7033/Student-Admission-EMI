import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get sidebar state
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Cookies from 'js-cookie';

Chart.register(Tooltip, Title, ArcElement, Legend);

// Data for the courses
const data = {
  labels: [], // No need for labels if you are using a custom legend
  datasets: [
    {
      data: [30, 20, 15, 25, 10], // Adjust the data as per the course purchase numbers
      backgroundColor: [
        '#FF6384', // Red for UI/UX Designer
        '#FFCE56', // Yellow for Backend Developer
        '#36A2EB', // Blue for Frontend Developer
        '#FF9F40', // Orange for Graphic Design
        '#9966FF', // Purple for Artificial Intelligence
      ],
      hoverOffset: 4,
      cutout: '70%', // This will create a doughnut with a hollow center
    },
  ],
};

// Plugin to add text in the center of the doughnut chart
const plugins = [
  {
    id: 'centerText',
    beforeDraw: function (chart) {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 160).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';

      const text = 'Analytics';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 1.9;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

const PaymentChart = () => {
  const token = Cookies.get('authToken');

  return (
    <div className="w-full md:w-1/2 p-2 text-left rounded-xl bg-white shadow-md">
      <div className="flex justify-between items-center">
        <label className="text-lg font-semibold">Payment</label>
        <button className="px-8 py-2 rounded-md text-white text-sm bg-[#637D9B]">Full Chart</button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Doughnut Chart */}
        <div className="w-full flex justify-center h-36 md:w-32 md:h-40 flex-shrink-0">
          <Doughnut data={data} plugins={plugins} />
        </div>

        {/* Payment Details */}
        <div className="text-sm flex">
          <div className="flex flex-col gap-0 md:gap-4">
            <div>#3250 payment request to (Mark Angel)</div>
            <div>#3250 payment due of (Altain Chopal)</div>
            <div>#3250 payment received (Roger Federa)</div>
            <div>#3250 payment pending of (Angellina K.)</div>
          </div>
        {/* </div> */}
        
        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 md:gap-2">
          <button className="w-24 rounded-md text-white text-center text-sm py-1 bg-[#637D9B]">Payment Sent</button>
          <button className="w-24 rounded-md text-white text-center text-sm py-1 bg-[#637D9B]">Due</button>
          <button className="w-24 rounded-md text-white text-center text-sm py-1 bg-[#637D9B]">Received</button>
          <button className="w-24 rounded-md text-white text-center text-sm py-1 bg-[#637D9B]">Pending</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PaymentChart;
