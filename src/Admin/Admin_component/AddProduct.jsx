import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

  const navigate= useNavigate()
  const [postId, setPostId] = useState('');
  const [postBrand, setPostBrand] = useState('');
  const [postQuantity, setPostQuantity] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postDiscount, setPostDiscount] = useState('');
  const [postCategories, setPostCategories] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postSizes, setPostSizes] = useState('');

  const size = postSizes.split('').map(Number);

  const initialValues = {
    id: postId,
    brand: postBrand,
    quantity: postQuantity,
    price: postPrice,
    discount: postDiscount,
    categories: postCategories,
    description: postDescription,
    image: postImage,
    sizes: size,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('initial', initialValues);
    console.log('ghgguh', size);
    axios.post(`http://localhost:3031/products`, initialValues);
    Swal.fire("product added sucessFully!");
    navigate(-1)
  };
  const handleBack=()=>{
    navigate(-1)
  }

  return (
    <div className="flex justify-center">
      <div className="relative bg-white bg-opacity-90 shadow-lg rounded-lg w-full max-w-4xl p-6">
        <button className='font-bold text-3xl'onClick={handleBack}>⇦</button>
        <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
          Add Product
        </h1>
        <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 gap-3">
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Id
      </label>
      <input
        type="text"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Brand
      </label>
      <input
        type="text"
        value={postBrand}
        onChange={(e) => setPostBrand(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Quantity
      </label>
      <input
        type="text"
        value={postQuantity}
        onChange={(e) => setPostQuantity(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Price
      </label>
      <input
        type="text"
        value={postPrice}
        onChange={(e) => setPostPrice(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Discount
      </label>
      <input
        type="text"
        value={postDiscount}
        onChange={(e) => setPostDiscount(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Categories
      </label>
      <input
        type="text"
        value={postCategories}
        onChange={(e) => setPostCategories(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Description
      </label>
      <input
        type="text"
        value={postDescription}
        onChange={(e) => setPostDescription(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Image URL
      </label>
      <input
        type="text"
        value={postImage}
        onChange={(e) => setPostImage(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">
        Product Sizes
      </label>
      <input
        type="text"
        value={postSizes}
        onChange={(e) => setPostSizes(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
  <div className="mt-4 text-center">
    <button
      type="submit"
      className="px-4 py-2 text-white bg-red-800 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default AddProduct;
