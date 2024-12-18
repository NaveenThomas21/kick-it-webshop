import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const Dashbord = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3031/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3031/users").then((response) => {
      setUser(response.data);
    });
  }, []);

  const userOrders = user.map((u) => u.orders);
  const realOrders = userOrders.filter((order) => order !== undefined);
  const orginalOrders = realOrders.filter((order) => order.length > 0);

  const brands = orginalOrders.flat().map((item) => item.brand);

  const isNestedRoute = location.pathname !== "/dashboard";

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/*//////////////////////////////////////////////// Sidebar////////////////////////////////////////////////// */}
      <Sidebar />

      {/*//////////////////////////////////////////////////////// Main content////////////////////////////////////////// */}
      <div className="flex-1 p-4 sm:p-8 ml-0 sm:ml-64 transition-all duration-300">
        {!isNestedRoute && (
          <>
            <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-4xl font-bold text-gray-800 animate-fadeIn">
                Welcome to Admin Dashboard
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/*//////////////////////////////////////////////////////////////////// Total Products ///////////////////////////////////////////*/}
              <div
                className="p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
                style={{
                  background: "linear-gradient(135deg, #4caf50, #a5d6a7)",
                  color: "white",
                }}
              >
                <h2 className="text-lg font-semibold">Total Products</h2>
                <p className="text-4xl font-bold mt-4">{products.length}</p>
              </div>

              {/*/////////////////////////////////////////////////////////////////// Total Users////////////////////////////////////*/}
              <div
                className="p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
                style={{
                  background: "linear-gradient(135deg, #2196f3, #90caf9)",
                  color: "white",
                }}
              >
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-4xl font-bold mt-4">{user.length - 1}</p>
              </div>

              {/* /////////////////////////////////////////////////////User Orders ///////////////////////////////////////////////////////*/}
              <div
                className="p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ffcc80)",
                  color: "white",
                }}
              >
                <h2 className="text-lg font-semibold">User Orders</h2>
                <p className="text-4xl font-bold mt-4">{brands.length}</p>
              </div>
            </div>
          </>
        )}

        {/*////////////////////////////////////////////////////////////////// Nested routes//////////////////////////////////////////////////// */}
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
