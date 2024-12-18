import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3031/users')
      .then((response) => {
        setUserDetails(response.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  const withOutAdmin=userDetails.filter((user)=>!user.isAdmin)

  const handleViewMore = (id) => {
    navigate(`userDetails/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
   
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        
    
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          User Details
        </h1>
        
        
        <div className="flex flex-col gap-6">
          {withOutAdmin.map((usr) => (
            <div
              key={usr.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
            >
              
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{usr.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Email:</strong> {usr.email}
              </p>
              
        
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                  onClick={() => handleViewMore(usr.id)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
