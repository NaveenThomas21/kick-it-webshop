import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [toCart, setAddToCart] = useState([]);
  const user = localStorage.getItem("user");
  const navigate=useNavigate()
  useEffect(() => {
    if (!user) {
      alert("Please login to view your cart");
      return;
    }

    const userId = user;
    axios.get(`http://localhost:3031/users/${userId}`)
      .then((response) => {
        if (Array.isArray(response.data.cart)) {

          
          const cartWithInitialQuantity = response.data.cart.map(product => ({
            ...product,
            quantity: 1,
          }));

          setAddToCart(cartWithInitialQuantity);
        } else {
          setAddToCart([]);
        }
        console.log("response in cart", response.data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching cart details", error);
      });
  }, [user]);

  //////////////////////// Handle Decrease of Quantity
  const handleDecrease = (productId) => {
    setAddToCart(prevCart => {
      return prevCart.map(product => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 }; 
        }
        return product;
      });
    });
  };

  ///////////////////// Handle Increase of Quantity
    const handleIncrease = (productId) => {
      setAddToCart(prevCart => {
        return prevCart.map(product => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity + 1 }; // Increase quantity
          }
          return product;
        });
      });
    };

  ///////////////////////// Handle Remove Product from Cart
  const handleRemoveCart = (productId) => {
    const userId = user;

    axios
      .get(`http://localhost:3031/users/${userId}`)
      .then((response) => {
        const updatedCart = response.data.cart.filter(
          (item) => item.id !== productId
        );

      
        axios.patch(`http://localhost:3031/users/${userId}`, {
          cart: updatedCart,
        });
              setAddToCart(updatedCart);

              window.location.reload()

        
      })
      .catch((error) => {
        console.error("Error while removing the product", error);
      });
      };
      
 
  const handleBuyAll=()=>{
    if( totalPrice > 0){
      navigate('/payment')
    }
  }

  //// //////////////////////////Calculate total price
  const totalPrice = toCart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Cart
        </h1>
        {toCart.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Cart is empty</p>
        ) : (
          toCart.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-700">{product.brand}</p>
                  <p className="text-gray-600 font-bold">Price: ₹{product.price}</p>
                  <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md shadow-sm">
                    <button
                      onClick={() => handleDecrease(product.id)}
                      className="px-2 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-300 transition-all"
                    >
                      -
                    </button>
                    <p className="text-sm font-medium text-gray-700">
                      {product.quantity} {/* Display the quantity of each product */}
                    </p>
                    <button
                      onClick={() => handleIncrease(product.id)}
                      className="px-2 py-1 bg-gray-700 text-white text-sm rounded-md hover:bg-gray-400 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => handleRemoveCart(product.id)}
                  className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Total Price"
          className="border border-gray-300 rounded-md py-2 px-4 text-center w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={`₹${totalPrice}`} // Show total price
          readOnly
        />
        <button
          className="flex justify-center bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 shadow-md transition duration-300 ease-in-out" onClick={handleBuyAll}>
          Buy All
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
