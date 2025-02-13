import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Academilcon from "../../img/AcademyIcon.png";
import { SideMenuItems } from "../../Constant/SideMenuItems";
import thexlacademy_logo from "../../img/thexlacademy_logo.jpg";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const menuPermission = user?.menuPermission || []; // Get the user's menu permissions
  // console.log("SidebARPAGE LOG 1", menuPermission);
  // Filter the SideMenuItems based on the permissions
  const filteredMenuItems = SideMenuItems.filter((item) =>
    menuPermission.includes(item.label)
  );
  const [isOpen, setIsOpen] = useState(true); // For desktop sidebar
  const [smallOpen, setSmallOpen] = useState(false); // For mobile sidebar

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle desktop sidebar
  const handleToggleSidebar = () => setSmallOpen(!smallOpen); // Toggle mobile sidebar

  const sidebarWidth = isOpen ? "w-52" : "w-16";
  const labelClass = isOpen ? "ml-3 cursor-pointer" : "hidden";
  const itemClass =
    "cursor-pointer flex items-center pl-5 p-2.5 my-1.5 rounded-lg";
  const hoverClass = "hover:bg-[#637D9B] hover:text-white";

  return (
    <div>
      <div
        className={`hidden md:block bg-white h-screen transition-all duration-300 ${sidebarWidth}`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          {/* <img
            src={isOpen ? Academilcon : thexlacademy_logo}
            alt="Academy Logo"
            className="h-8"
          /> */}
          <label className=" text-green-600 font-bold">SUMO INSITUTE💚</label>
          <MenuIcon
            fontSize="medium"
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        </div>

        {filteredMenuItems.map((item) => (
          <NavLink
            to={item.link}
            className={`${itemClass} ${hoverClass}`}
            id={item.id}
            key={item.id}
          >
            {typeof item.icon === "string" ? (
              <img
                src={item.icon}
                alt={`${item.label} Icon`}
                className={`${!isOpen ? "mt-2" : ""}`}
              />
            ) : (
              <item.icon
                fontSize="large"
                className={`${!isOpen ? "mt-2 ml-1" : ""}`}
              />
            )}
            <label className={`font-semibold ${labelClass}`}>
              {item.label}
            </label>
          </NavLink>
        ))}

        {!isOpen && (
          <>
            {filteredMenuItems.map((item) => (
              <ReactTooltip
                anchorId={item.id}
                place="top"
                content={item.label}
                key={item.id}
              />
            ))}
          </>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div className="fixed top-4 left-4 z-50">
          {smallOpen ? (
            <CloseIcon
              fontSize="large"
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          ) : (
            <MenuIcon
              fontSize="large"
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          )}
        </div>

        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${
            smallOpen ? "translate-x-0" : "-translate-x-full"
          } w-1/2 md:w-64 z-40`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <img className="w-32" src={Academilcon} alt="Academy Logo" />
            <CloseIcon
              fontSize="large"
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          </div>

          <nav>
            {filteredMenuItems.map((item) => (
              <NavLink
                to={item.link}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={handleToggleSidebar}
                key={item.id}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
