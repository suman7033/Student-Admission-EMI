import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to get sidebar state
import TotalAdmission from "./TotalAdmission";
import Pending from "./Pending";
import PortalAdmission from "./PortalAdmission";
import TotalRevenue from "./TotalRevenue";
import CoursesPaiChart from "./CoursesPaiChart";
import PerformanceChart from "./PerformanceChart";
import PaymentChart from "./PaymentChart";
import DashboardSmallChart from "./DashboardCharts/DashboardSmallChart";
import DashboardFilter from "./DashboardFilter";
import Rejected from "./Rejected";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {

  return (
    <>
      <Navbar title={"Dashboard"} />
      <div className="px-3 bg-[#f5f3f3]">
        {/* Filter Section */}
        <div className="py-2">
          <DashboardFilter />
        </div>

        {/* Top Summary Cards */}
        <div className="flex flex-wrap gap-3 md:gap-0 justify-center md:justify-between">
          <TotalAdmission className="flex-grow md:flex-none w-full sm:w-1/2 md:w-1/4" />
          <Pending className="flex-grow md:flex-none w-full sm:w-1/2 md:w-1/4" />
          <PortalAdmission className="flex-grow md:flex-none w-full sm:w-1/2 md:w-1/4" />
          <TotalRevenue className="flex-grow md:flex-none w-full sm:w-1/2 md:w-1/4" />
          <Rejected className="flex-grow md:flex-none w-full sm:w-1/2 md:w-1/4" />
        </div>

        {/* Chart Section */}
        <div className="flex flex-wrap md:flex-nowrap py-2 gap-4">
          <CoursesPaiChart className="flex-grow w-full md:w-1/2" />
          <PerformanceChart className="flex-grow w-full md:w-1/2" />
        </div>

        {/* Additional Charts */}
        <div className="flex flex-wrap md:flex-nowrap py-2 gap-4">
          <PaymentChart className="flex-grow w-full md:w-1/2" />
          <DashboardSmallChart className="flex-grow w-full md:w-1/2" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
