import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
    const [orderProducts, setOrderProducts] = useState([]);
    const userId = localStorage.getItem("user");

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3031/users/${userId}`)
                .then((response) => {
                    setOrderProducts(response.data.orders || []);
                })
                .catch((error) => {
                    console.error("Error fetching order products:", error);
                });
        }
    }, [userId]);

    const handleCancel = (productId) => {
        const updatedOrders = orderProducts.filter((product) => product.id !== productId);
        setOrderProducts(updatedOrders);

        axios
            .patch(`http://localhost:3031/users/${userId}`, { orders: updatedOrders })
            .catch((error) => {
                console.error("Error updating orders:", error);
                // Optionally revert state on error
                setOrderProducts((prevProducts) => [...prevProducts, ...updatedOrders]);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Your Orders
                </h1>

                {orderProducts.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">
                        No orders found. Start shopping now!
                    </p>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6">
                        {orderProducts.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-64"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name || "Product"}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {product.brand}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {product.categories}
                                    </p>
                                    <p className="text-gray-800 font-bold mt-2">
                                        Price: ₹{product.price || "N/A"}
                                    </p>
                                    <button
                                        onClick={() => handleCancel(product.id)}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
