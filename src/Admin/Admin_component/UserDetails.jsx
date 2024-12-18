import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const UserDetails = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
const navigate=useNavigate()
  useEffect(() => {
   
    axios
      .get(`http://localhost:3031/users/${id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]); 

  const handleLog = () => {

    axios
      .patch(`http://localhost:3031/users/${id}`, { isLogged: !userData.isLogged })
      .then((response) => {
        setUserData(response.data); 
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };
const handleBack = ()=>{
navigate(-1)
}
  return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
  <div className="w-full flex justify-start px-6 mb-4">
    <button className="font-bold text-3xl"onClick={handleBack}>
      ⇦
    </button>
  </div>

  <div className="w-full flex justify-center mb-6">
    <img
      src="https://cdn-icons-png.freepik.com/256/7274/7274427.png?uid=R176361823&semt=ais_hybrid"
      alt="Logo"
      className="w-24 h-24 object-cover rounded-full shadow-md"
    />
  </div>

  <div className="bg-white shadow-lg rounded-lg p-6 w-4/5 md:w-3/5">
    <h1 className="text-2xl font-bold text-center mb-4">User Details</h1>
    <ul className="space-y-2">
      <li className="text-lg">
        <span className="font-semibold">Name:</span> {userData.name}
      </li>
      <li className="text-lg">
        <span className="font-semibold">Email:</span> {userData.email}
      </li>
    </ul>
  </div>

  <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-4/5 md:w-3/5">
    <h1 className="text-2xl font-bold text-center mb-4">Cart Details</h1>
    {userData.cart && userData.cart.length > 0 ? (
      <ul className="space-y-4">
        {userData.cart.map((item, index) => (
          <li key={index} className="flex items-center space-x-4 border-b pb-4">
            <img src={item.image} alt={item.brand} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <p className="font-semibold">{item.brand}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center">No items in the cart</p>
    )}
  </div>

  <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-4/5 md:w-3/5">
    <h1 className="text-2xl font-bold text-center mb-4">Order Details</h1>
    {userData.orders && userData.orders.length > 0 ? (
      <ul className="space-y-4">
        {userData.orders.map((order, index) => (
          <li key={index} className="flex items-center space-x-4 border-b pb-4">
            <img src={order.image} alt={order.brand} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <p className="font-semibold">{order.brand}</p>
              <p className="text-gray-600">Price: ₹{order.price}</p>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">Shipped Details</h2>
                <div className="space-y-2 mt-2">
                  <p className="text-sm text-gray-600"><strong>Status:</strong> Pending</p>
                  <p className="text-sm text-gray-600"><strong>Address:</strong> Kerala, Calicut, India</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center">No orders placed yet</p>
    )}
  </div>
  <button
  onClick={handleLog}
  className={`px-4 m-4 py-2 rounded-md font-semibold text-white ${
    userData.isLogged
      ? 'bg-red-500 hover:bg-red-600' // Block button style (red color)
      : 'bg-green-500 hover:bg-green-600' // UnBlock button style (green color)
  } transition duration-200 ease-in-out`}
>
  {userData.isLogged ? 'Block' : 'UnBlock'}
</button>

</div>

  );
};

export default UserDetails;
