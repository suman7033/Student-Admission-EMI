import { IoNotifications } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Redux/Slices/auth.Slice";
import PlusIcon from "../../img/PlucIcon.png";
import IdCard from "../Pooup/IdCard";
import Invoice from "../Pooup/Invoice";
import CertificatePop from "../Pooup/CertificatePop";

function Navbar({ title }) {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const idCardView = useSelector((state) => state.commonSlice.idCardView);
  const invoiceView = useSelector((state) => state.commonSlice.inVoiceView);
  const certificateView = useSelector(
    (state) => state.commonSlice.certificateView
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [logoutView, setLogoutPop] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const handleLogoutHandler = () => {
    setLogoutPop(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    // navigate("/login");
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div
        className="h-[60px] bg-gray-600 px-5 border-b-2 border-gray-300 grid b sticky top-0 "
        style={{ zIndex: "1" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-md md:text-xl ml-2 font-semibold text-white">
              {title}
            </h1>
          </div>
          <div className="flex justify-end items-center">
            <Link to="/add_admission" className="mr-4 cursor-pointer">
              <img src={PlusIcon} />
            </Link>
            <IoNotifications size={22} className="mx-4 text-white" />

            <div
              className="relative group"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <img
                className="h-[40px] w-[40px] rounded-full mx-4 cursor-pointer"
                // src={user?.image || "./images/profile.png"}
                src={`data:image/png;base64,${user?.userPic}`}
                alt="user photo"
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-md">
                  <div className="p-2">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={`data:image/png;base64,${user?.userPic}`}
                        alt="user photo"
                      />

                      <div>
                        <p className="text-gray-800 font-semibold whitespace-nowrap">
                          {user?.name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <Link to="/profile" className="block p-2 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link
                      to={"/update-profile"}
                      className="block p-2 hover:bg-gray-100"
                    >
                      Update Profile
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={handleLogoutHandler}
                      className="block p-1.5 text-red-500 font-semibold"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* asking for logout */}
      {logoutView && (
        <div
          onClick={() => setLogoutPop(false)}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to Logout
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleLogout()}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutPop(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {idCardView && (
        <div className="w-full h-full absolute">
          <IdCard />
        </div>
      )}
      {invoiceView && (
        <div className="w-full h-full absolute">
          <Invoice />
        </div>
      )}
      {certificateView && (
        <div className="w-full h-full absolute">
          <CertificatePop />
        </div>
      )}
    </>
  );
}

export default Navbar;
