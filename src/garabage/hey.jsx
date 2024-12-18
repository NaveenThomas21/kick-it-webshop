


import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products } = useContext(ProductContext);
  const [filterMen, SetFilterMen] = useState([]);
  const [filterWomen, SetFilterWomen] = useState([]);

  const navigate = useNavigate();

  // Update filtered products when context data changes
  useEffect(() => {
    if (menProducts) SetFilterMen(menProducts);
    if (womenProducts) SetFilterWomen(womenProducts);
  }, [menProducts, womenProducts]);

  const handleCardClick = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleBrandClick = (brand, type) => {
    if (type === "men") {
      SetFilterMen(
        brand === "All"
          ? menProducts
          : menProducts.filter((product) => product.brand === brand)
      );
    } else if (type === "women") {
      SetFilterWomen(
        brand === "All"
          ? womenProducts
          : womenProducts.filter((product) => product.brand === brand)
      );
    }
  };

  return (
    <div className="p-8 bg-gray-300 ">
      {/* Men's Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <div>
          <ul className="flex justify-evenly border-b-2 border-orange-500">
            <h1 className="flex text-3xl font-bold text-gray-800 pb-2 mb-4">
              Men's Section
            </h1>
            <li
              className="p-2 hover:underline hover:text-orange-500"
              onClick={() => handleBrandClick("All", "men")}
            >
              All
            </li>
            <li
              className="p-2 hover:underline hover:text-orange-500"
              onClick={() => handleBrandClick("Nike", "men")}
            >
              Nike
            </li>
            <li
              className="p-2 hover:underline hover:text-orange-500"
              onClick={() => handleBrandClick("Puma", "men")}
            >
              Puma
            </li>
            <li
              className="p-2 hover:underline hover:text-orange-500"
              onClick={() => handleBrandClick("New Balance", "men")}
            >
              New Balance
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-3">
          {filterMen.length === 0 ? (
            <p className="text-gray-600">No Men's Products Available</p>
          ) : (
            filterMen.map((product) => (
              <div
                key={product.id}
                onClick={() => handleCardClick(product.id)}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
              >
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  {product.brand}
                </h2>
                <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
                <p className="text-gray-600 mb-2">
                  Discount: {product.discount}%
                </p>
                <p className="text-gray-600">Sizes: {product.sizes}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Women's Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ul className="flex justify-evenly border-b-2 border-orange-500 p-3">
          <h1 className="text-3xl font-bold text-gray-800">Women's Section</h1>
          <li
            className="p-2 hover:underline hover:text-orange-500"
            onClick={() => handleBrandClick("All", "women")}
          >
            All
          </li>
          <li
            className="p-2 hover:underline hover:text-orange-500"
            onClick={() => handleBrandClick("Nike", "women")}
          >
            Nike
          </li>
          <li
            className="p-2 hover:underline hover:text-orange-500"
            onClick={() => handleBrandClick("New Balance", "women")}
          >
            New Balance
          </li>
          <li
            className="p-2 hover:underline hover:text-orange-500"
            onClick={() => handleBrandClick("Puma", "women")}
          >
            Puma
          </li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterWomen.length === 0 ? (
            <p className="text-gray-600">No Women's Products Available</p>
          ) : (
            filterWomen.map((product) => (
              <div
                key={product.id}
                onClick={() => handleCardClick(product.id)}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
              >
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  {product.brand}
                </h2>
                <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
                <p className="text-gray-600 mb-2">
                  Discount: {product.discount}%
                </p>
                <p className="text-gray-600">Sizes: {product.sizes.join(", ")}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
