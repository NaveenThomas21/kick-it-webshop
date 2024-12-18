import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    pin: '',
    town: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form is submitted successfully', formData);

    const userId = localStorage.getItem('user');
    if (!userId) { 
      console.error('User ID is not available in localStorage');
      return;
    }

    try {
      const { data: userDetails } = await axios.get(`http://localhost:3031/users/${userId}`);
      console.log('User details fetched successfully:', userDetails);

      if(userDetails.cart){
        userDetails.orders=[...userDetails.cart];
        userDetails.cart=[]    
      }
      
      const updatedOrder=userDetails.orders

      axios.patch(`http://localhost:3031/users/${userId}`,{cart :[],orders: updatedOrder})

      navigate('/orderDetails')
        

    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
      } else {
        console.error('Error fetching user details:', error.message);
      }
      
    }


      
  };

  return (
    <div>
      <h2>Payment Section</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Landmark</label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          required
        />

        <label>PIN</label>
        <input
          type="text"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          required
        />

        <label>Town</label>
        <input
          type="text"
          name="town"
          value={formData.town}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentSection;
