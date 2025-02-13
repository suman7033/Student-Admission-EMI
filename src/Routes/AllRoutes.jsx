import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { URL } from "../Configs/RoutesConstant";
import Login from "../Pages/Login/Login";
import Sidebar from "../Pages/Sidebar/Sidebar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Permissions from "../Configs/Permission";
import TeamList from "../Pages/TeamList/TeamList";
import BranchList from "../Pages/BranchList/BranchList";
import AdmissionList from "../Pages/AdmissionProcess/AdmissionList";
import CourseList from "../Pages/CourseList/CourseList";
import MailList from "../Pages/MailList/MailList";
import MainSourceList from "../Pages/MainSourceList/SourceList";
import SubSourceList from "../Pages/SubSource/SubSourceList";
import WhatsAppList from "../Pages/Whatsapp/WhatsappList";
import AccountList from "../Pages/Account/AccountList";
import Profile from "../Pages/Profile/ProfilePage";
import AddSubSource from "../Pages/SubSource/AddSubSourceList";
import AddCourseForm from "../Pages/CourseList/AddCourseForm";
import AddBranchForm from "../Pages/BranchList/BranchListForm";
import AddMainSource from "../Pages/MainSourceList/AddSourceForm";
import AddAccount from "../Pages/Account/AddAccount";
import AddWhatsapp from "../Pages/Whatsapp/WhatsappForm";
import AddMail from "../Pages/MailList/MailForm";
import AddTeam from "../Pages/TeamList/AddNewUser";
import ViewTeam from "../Pages/TeamList/teamDetails";
import AddAdmission from "../Pages/AdmissionProcess/AdmissionForm";
import ForgotPassword from "../Pages/Login/forgotPassword";
import PasswordSetUp from "../Pages/Login/PasswordSetUp";
import AdmissionDetails from "../Pages/AdmissionProcess/PersonalDetails";
import AdmissionDetails1 from "../Pages/AdmissionProcess/PersonalDetails1";
import AdmissionDetails2 from "../Pages/AdmissionProcess/PersonalDetails2";
import Sent_successfull from "../Pages/Login/sent_successfull";
import PasswordSetupSuccessfull from "../Pages/Login/password_SetUp_Successfull";
import IdCard from "../Pages/Pooup/IdCard";

const AllRoutes = () => {
  const location = useLocation();

  if (location.pathname === URL.login || location.pathname === "/login") {
    return (
      <div className="h-screen w-screen">
        <Login />
      </div>
    );
  } else if (location.pathname === "/forgot_password") {
    return (
      <div className="h-screen bg-white w-screen">
        <ForgotPassword />
      </div>
    );
  } else if (location.pathname === "/password_setup") {
    return (
      <div className="h-screen w-screen">
        <PasswordSetUp />
      </div>
    );
  } else if (
    location.pathname === URL.sent_successfull ||
    location.pathname === "/sent_successfull"
  ) {
    return (
      <div className="h-screen w-screen">
        <Sent_successfull />
      </div>
    );
  } else if (location.pathname === "/password_setup_sucessfull") {
    return (
      <div className="h-screen w-screen">
        <PasswordSetupSuccessfull />
      </div>
    );
  } else {
    return (
      <div className="h-screen flex">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="w-screen bg-[#F5F5F5] relative overflow-scroll">
          <Routes>
            <Route
              path={URL.dashboard}
              element={
                <Permissions permission={"Dashboard"}>
                  <Dashboard />
                </Permissions>
              }
            />
            <Route
              path={URL.admission}
              element={
                <Permissions permission={"Admission List"}>
                  <AdmissionList />
                </Permissions>
              }
            />
            <Route
              path={URL.teamList}
              element={
                <Permissions permission={"Team List"}>
                  <TeamList />
                </Permissions>
              }
            />
            <Route
              path={URL.mainSource}
              element={
                <Permissions permission={"MainSource List"}>
                  <MainSourceList />
                </Permissions>
              }
            />
            <Route
              path={URL.subSource}
              element={
                <Permissions permission={"SubSource List"}>
                  <SubSourceList />
                </Permissions>
              }
            />
            <Route
              path={URL.courseList}
              element={
                <Permissions permission={"Course List"}>
                  <CourseList />
                </Permissions>
              }
            />
            <Route
              path={URL.branchList}
              element={
                <Permissions permission={"Branch List"}>
                  <BranchList />
                </Permissions>
              }
            />
            <Route
              path={URL.accountList}
              element={
                <Permissions permission={"Account List"}>
                  <AccountList />
                </Permissions>
              }
            />
            <Route
              path={URL.whatsapp}
              element={
                <Permissions permission={"Whatsapp List"}>
                  <WhatsAppList />
                </Permissions>
              }
            />
            <Route
              path={URL.mail}
              element={
                <Permissions permission={"Mail List"}>
                  <MailList />
                </Permissions>
              }
            />
            <Route path={URL.profile} element={<Profile />} />
            <Route path={URL.add_sub_source} element={<AddSubSource />} />
            <Route path={URL.add_course} element={<AddCourseForm />} />
            <Route path={URL.add_branch} element={<AddBranchForm />} />
            <Route path={URL.add_mainSource} element={<AddMainSource />} />
            <Route path={URL.add_account} element={<AddAccount />} />
            <Route path={URL.add_whatsapp} element={<AddWhatsapp />} />
            <Route path={URL.add_mail} element={<AddMail />} />
            <Route path={URL.add_team} element={<AddTeam />} />
            <Route path={URL.view_team} element={<ViewTeam />} />
            <Route path={URL.add_admission} element={<AddAdmission />} />
            <Route
              path={URL.view_addmission_details}
              element={<AdmissionDetails />}
            />
            <Route
              path={URL.view_admission_details1}
              element={<AdmissionDetails1 />}
            />
            <Route path={URL.view_addmission_details2} element={<AdmissionDetails2/>}/>
          </Routes>
        </div>
      </div>
    );
  }
};

export default AllRoutes;
