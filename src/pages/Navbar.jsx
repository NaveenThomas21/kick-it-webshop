import React, { useEffect, useState } from "react";
import { NavbarMenu } from "../mockData/data";
import { LuShoppingCart } from "react-icons/lu";
import { TiThMenuOutline } from "react-icons/ti";
import { PiSneakerMoveFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import ResopnsiveMenu from "./ResponsiveMenu";
import axios from "axios";



const Navbar = () => {


  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [userCart, setUserCart] = useState([])
  const getUserName = localStorage.getItem("username")

  console.log("getusername", getUserName)
  const getUser = localStorage.getItem("user");
  console.log("User from localStorage:", getUser);

  const handleInOrNot = () => {
    navigate("/signIn");
  };
  const handleCart = () => {

    navigate("/addToCart");
  };

  const handleLogOut = () => {
    localStorage.clear();
    setShowLogout(false); 
    navigate("/SignIn");
  };

  const handleProfile = () => {
    setShowLogout((prev) => !prev);
  };

  useEffect(() => {
    axios.get(`http://localhost:3031/users/${getUser}`)
      .then((response) => {
        setUserCart(response.data)
      })

  }, [])
 
  const handleOrders =()=>{
navigate('/orderDetails')
  }
  return (
    <div className="w-full">
      <nav className="w-full bg-white shadow-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
          {/* Logo Section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <PiSneakerMoveFill />
            <p>Kick</p>
            <p className="text-secondary">it</p>
          </div>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="inline-block py-1 px-3 hover:text-primary font-semibold"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4 relative">
            <button
              className="text-lg hover:text-orange-600 bg-white p-3 rounded-full duration-200 shadow-md relative"
              onClick={handleCart}
            >
              <LuShoppingCart className="text-gray-700 w-6 h-6" />
              {userCart.cart ? (
                <p className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg transform translate-x-1/2 -translate-y-1/2">
       
                  {userCart.cart.length}

                </p>
              ) : (
                <p></p>
              )}
            </button>


<div className=""onClick={handleOrders}>
<FaShoppingBag />
</div>
            {getUser ? (
              <div className="flex items-center gap-2">
                <button
                  className="text-lg hover:text-gray-600 bg-gray-100 p-2 rounded-full text-center flex justify-center items-center gap-2"
                  onClick={handleProfile}
                >
                  <CgProfile />
                  {getUserName}
                </button>


                {showLogout && (
                  <button
                    className="text-red-500 font-semibold"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <button
                className="hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary px-6 py-2 duration-200 hidden md:block"
                onClick={handleInOrNot}
              >
                Log In
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu Section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <TiThMenuOutline className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Section */}
      <ResopnsiveMenu open={open} />
    </div>
  );
};

export default Navbar;
