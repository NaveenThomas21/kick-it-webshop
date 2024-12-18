import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Products = () => {
    const { products } = useContext(ProductContext);
    const [allProducts, setAllProducts] = useState([]);
const navigate=useNavigate()
    useEffect(() => {
        if (products) {
            setAllProducts(products);
        }
    }, [products]);

    const handleCardClick = (category) => {
        if (category === "entireProducts") {
            setAllProducts(products); 
        } else {
            const filteredProducts = products.filter((product) => product.categories === category);
            setAllProducts(filteredProducts);
        }
    };
const handleViewClick =(id)=>{
navigate(`/productDetails/${id}`)
}


    return (
        <div className="p-6">
            <div className="flex flex-col items-center mb-6">
                <h1 className="font-bold text-xl mb-4">Our Latest Collections</h1>
                <div className="flex space-x-6">
                    <p className="hover:text-orange-500 hover:underline cursor-pointer" onClick={() => handleCardClick("entireProducts")}>All</p>
                    <p className="hover:text-orange-500 hover:underline cursor-pointer" onClick={() => handleCardClick("Men")}>Men</p>
                    <p className="hover:text-orange-500 hover:underline cursor-pointer" onClick={() => handleCardClick("Women")}>Women</p>
                </div>
            </div>
            {allProducts.length === 0 ? (
                <p className="text-center text-gray-500">No Products Available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-lg hover:scale-105 hover:rotate transition-transform duration-300 p-4"
                        >
                            <img
                                src={product.image}
                                alt={product.brand}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {product.brand}
                                </h2>
                                <p className="text-gray-600">Price: ₹{product.price}</p>
                                <p className="text-gray-600">Discount: {product.discount}%</p>
                                <p className="text-gray-600">
                                    Sizes: {product.sizes ? product.sizes.join(', ') : 'N/A'}
                                </p>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                
                                <button className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-all duration-300 w-full"onClick={()=>handleViewClick(product.id)}>
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
   <Footer/>
        </div>
    );
};

export default Products;
