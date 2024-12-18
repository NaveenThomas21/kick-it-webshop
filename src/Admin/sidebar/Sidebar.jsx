import React, { useState } from "react";
import {  AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/SignIn");
  };


  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };


  React.useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      {/*/////////////////////////////////////////////// Sidebar////////////////////////////////////////////////////// */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen fixed top-0 left-0 p-5 pt-8 duration-300 ${isMobile && !open && "w-20"}`}
      >
        {/* /////////////////////////////////////////////Toggle Button ///////////////////////////////*/}
        <button
          className={`absolute top-6 -right-3 w-7 h-7 rounded-full bg-white border-2 border-dark-purple ${
            open ? "rotate-180" : "rotate-0"
          } duration-300`}
          onClick={() => setOpen(!open)}
        >
          →
        </button>

        {/* //////////////////////////////////////////////////////////Admin Logo Section /////////////////////////////////////////////*/}
        <div className="flex items-center gap-x-4 mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9512/9512709.png" 
            className="w-10 h-10 rounded-full"
          />
          <span
            className={`text-white text-2xl font-semibold ${!open && "hidden"} duration-300`}
          >
            Admin Panel
          </span>
        </div>

        {/* ////////////////////////////////////////////////////Menu Items //////////////////////////////////////////////////////////////*/}
        <ul className="pt-6">
          {/* //////////////////////////////////////////////////Dashboard //////////////////////////////*/}
          <li className="flex items-center gap-x-4 p-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/dashboard">
              <span className="text-2xl">
              <MdDashboard />
              </span>
              <span
                className={`${!open && "hidden"} origin-left duration-200 text-lg`}
              >
                Dashboard
              </span>
            </Link>
          </li>

          {/* /////////////////////////////////////////////////////////Products ///////////////////////////////////////////////////////*/}
          <li className="flex items-center gap-x-4 p-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/dashboard/totalproducts">
              <span className="text-2xl">
                <AiOutlineShoppingCart />
              </span>
              <span
                className={`${!open && "hidden"} origin-left duration-200 text-lg`}
              >
                Products
              </span>
            </Link>
          </li>

          {/* Users */}
          <li className="flex items-center gap-x-4 p-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/dashboard/users">
              <span className="text-2xl">
                <AiOutlineUser />
              </span>
              <span
                className={`${!open && "hidden"} origin-left duration-200 text-lg`}
              >
                Users
              </span>
            </Link>
          </li>
        </ul>

        {/*///////////////////////////////////////////// Sign Out Button /////////////////////////////////////////////*/}
        <div
          className="absolute bottom-10 flex items-center gap-x-4 p-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer"
          onClick={handleSignOut}
        >
          <span className="text-2xl">
            <FiLogOut />
          </span>
          <span
            className={`${!open && "hidden"} origin-left duration-200 text-lg`}
          >
            Sign Out
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
