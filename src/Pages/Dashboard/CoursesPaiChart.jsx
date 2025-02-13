import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { BulletList } from 'react-content-loader';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js';

Chart.register(Tooltip, Title, ArcElement, Legend);

const CoursesPaiChart = () => {
  const token = Cookies.get('authToken');
  const [courseList, setCourseList] = useState([
    { CourseName: 'Frontend', CoursePrice: 300 },
    { CourseName: 'Backend', CoursePrice: 450 },
    { CourseName: 'Full stack', CoursePrice: 200 },
    { CourseName: 'Payton', CoursePrice: 600 },
  ]);  const [isLoading, setIsLoading] = useState(false);

  // Prepare chart data dynamically based on the fetched course list
  const chartData = {
    datasets: [{
      data: courseList.map(course => course.CoursePrice),  // Assuming coursePrice exists in the response
      backgroundColor: courseList.map((_, index) => {
        // You can customize this color logic or use a pre-defined array of colors
        const colors = [
          '#FF6384', '#FFCE56', '#36A2EB', '#FF9F40', '#9966FF', 
          '#4BC0C0', '#FFCD56', '#FFB6C1', '#9A5BFF', '#61D836'
        ];
        return colors[index % colors.length]; // Loop through colors if there are more courses than colors
      }),
      hoverOffset: 4,
      cutout: '70%', // Ensures the chart is a doughnut
    }],
  };

  const plugins = [{
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
      const textY = height / 1.90;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }];

  return (
    <div className='p-3 px-5 w-full md:w-1/2 md:h-52 shadow-md text-center rounded-xl bg-white'>
      <label className='block mb-1 font-semibold'>Top Courses Purchased</label>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        {/* Course List */}
        <div className='text-left mb-2 md:mb-0 md:w-1/2'>
          {isLoading ? (
            <BulletList speed={2}
              width="28vw"
              height={160}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb" />
          ) : (
            <ul className='list-none flex flex-col gap-y-2'>
              {courseList.map((course, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className="inline-block w-3 h-3 mr-4 rounded-full"
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }} // Dynamic color
                  ></span>
                  {course.CourseName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Doughnut Chart */}
        <div className='w-1/2 md:w-36'>
          <Doughnut data={chartData} plugins={plugins} />
        </div>
      </div>
    </div>
  );
}

export default CoursesPaiChart;
