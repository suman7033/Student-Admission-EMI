import React from 'react';
import { useSelector } from 'react-redux';
import { Chart, Tooltip, Title, ArcElement, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie';

// Registering the chart components
Chart.register(Tooltip, Title, ArcElement, Legend, BarElement, CategoryScale, LinearScale);

// Bar chart data without label and background color
const data = {
  labels: ['2020', '2021', '2022', '2023', '2024'], // Years for each bar
  datasets: [{
    data: [60, 45, 70, 90, 100], // Sample data matching performance
    backgroundColor: [
      '#0A9AE3',   // Blue for 2020
      '#1ACA0A',   // Green for 2021
      '#0AC9E3',   // Purple for 2022
      '#C451ED',   // Orange for 2023
      '#E30A0A'    // Red for 2024
    ],
    barThickness: 20, // Adjust the thickness here
    maxBarThickness: 20,
  }]
};

// Chart options for removing label and adjusting padding
const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow the chart to fill the container size
  plugins: {
    legend: {
      display: false // Hide legend completely
    }
  }
};

const PerformanceChart = () => {
  const token = Cookies.get('authToken');

  return (
    <div className="bg-white p-3 w-full md:h-52 md:w-1/2 rounded-xl shadow-md">
      <label className="block text-lg font-semibold mb-2">Performance</label>
      <div className="h-60 md:h-40">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default PerformanceChart;
