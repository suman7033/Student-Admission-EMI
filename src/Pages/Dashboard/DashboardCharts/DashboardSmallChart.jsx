import React from 'react'
import DealChart from './DealChart'
import RateChart from './RateChart'
import ApplicationChart from './ApplicationChart'
import VisitorChart from './VisitorChart'
import { useSelector } from 'react-redux'; // Import useSelector to get sidebar state
import Cookies from 'js-cookie';



const DashboardSmallChart = () => {

  return (
    <div className=' md:w-1/2 gap-2 flex justify-evenly flex-wrap'>
    {/* // <div className='flex md:w-1/2 flex-wrap justify-between'> */}
        <DealChart/>
        <RateChart/>
        <VisitorChart/>
        <ApplicationChart/>
    </div>
  )
}

export default DashboardSmallChart
