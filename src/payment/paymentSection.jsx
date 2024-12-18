import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const PaymentSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    landmark: '',
    pin: '',
    paymentMethod: '',
    cashOnDelivery: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('user');
    if (!userId) {
      console.error('User ID is not available in localStorage');
      return;
    }

    try {
      const { data: userDetails } = await axios.get(`http://localhost:3031/users/${userId}`);
      const cartFullDetails = userDetails.cart ? [...userDetails.cart] : [];
      const updatedOrders = [...(userDetails.orders || []), ...cartFullDetails];

      await axios.patch(`http://localhost:3031/users/${userId}`, {
        cart: [],
        orders: updatedOrders,
      });
      Swal.fire("Payment sucess")
      navigate('/orderDetails');
    } catch (error) {
      console.error('Error updating user data:', error.response?.data || error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex bg-gray-100"
      style={{
        backgroundImage: `url('public/images/aboutr3pexels-nytheone-1031955.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Payment Section */}
      <div className="lg:w-1/3 shadow-lg rounded-lg p-6 space-y-4 m-6">
        <h2 className="text-xl font-bold text-center text-gray-200">Payment Section</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Landmark */}
          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-100">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* PIN */}
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-100">
              PIN
            </label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Payment Method Dropdown */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-100">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Phone">Phone</option>
              <option value="Google Pay">Google Pay</option>
              <option value="Paytm">Paytm</option>
            </select>
          </div>

          {/* Cash on Delivery Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="cashOnDelivery"
              checked={formData.cashOnDelivery}
              onChange={handleChange}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded-md"
            />
            <label className="ml-2 text-sm font-medium text-gray-100">Cash on Delivery</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentSection;
