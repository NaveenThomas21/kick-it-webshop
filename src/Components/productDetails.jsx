import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { products } = useContext(ProductContext);
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const detail = products.find((product) => product.id === id);

    if (detail) {
      setProductDetails(detail);
    } else {
      console.log("Product not found:", id);
    }
  }, [products, id]);

  if (!productDetails) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p className="text-xl">Loading product details...</p>
      </div>
    );
  }

  const handleAddToCart = async (product) => {
    const user = localStorage.getItem("user");

    if (!user) {
      Swal.fire("Please login to add items to the cart");
      return;
    }

    const userId = user;

    try {
      const { data: userData } = await axios.get(`http://localhost:3031/users/${userId}`);

      const existingProduct = userData.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        Swal.fire("Product is already in the cart");
        return;
      }

      const updatedCart = [...userData.cart, product];
      await axios.patch(`http://localhost:3031/users/${userId}`, { cart: updatedCart });

      
      Swal.fire({
        title: "Product added successfully",
        icon: "success",
        timer: 2000, 
        showConfirmButton: false,
      });

      
      setTimeout(() => {
        navigate("/addToCart");
        window.location.reload();
      }, 1000); 
    } catch (error) {
      console.error("Error occurred while adding the product:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add product to cart. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src={productDetails.image}
              alt={productDetails.brand}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{productDetails.brand}</h1>
            <p className="text-xl font-bold text-gray-900 mb-2">₹{productDetails.price}</p>
            <p className="text-lg text-gray-600 mb-2">Discount: {productDetails.discount}%</p>
            <p className="text-lg text-gray-600 mb-4">
              Sizes: {productDetails.sizes ? productDetails.sizes.join(", ") : "N/A"}
            </p>
            <p className="text-lg text-gray-700 mb-6">Description: {productDetails.description}</p>
            <button
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 w-full"
              onClick={() => handleAddToCart(productDetails)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
