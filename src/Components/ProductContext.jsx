import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products,setProducts] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3031/products")
      .then((response) => {
        console.log("API Response:", response.data); 
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error('Error occurred while fetching product data', error);
      });
  }, []);

  useEffect(() => {
    console.log("Updated Products:", products);
  }, [products]); 
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
