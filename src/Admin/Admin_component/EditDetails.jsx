import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ProductContext } from '../../Components/ProductContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditDetails = () => {
  const [open, setClose] = useState(false)
  const [newImage, setNewImage] = useState('')
  const [newBrand, setNewBrand] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategorie, setNewCategorie] = useState('')
  const [newDiscount, setNewDiscount] = useState('')

  const navigate = useNavigate()

  const { products } = useContext(ProductContext)
  const [editDetails, setEditDetails] = useState({})
  const { id } = useParams()

  const details = products.find((product) => product.id === id)

  const valueToChange = {
    image: newImage,
    brand: newBrand,
    price: newPrice,
    discount: newDiscount,
    categories: newCategorie,
    description: newDescription
  }

  useEffect(() => {
    if (details) {
      setEditDetails(details)
      setNewImage(details.image)
      setNewBrand(details.brand)
      setNewPrice(details.price)
      setNewDescription(details.description)
      setNewCategorie(details.categories)
      setNewDiscount(details.discount)
    }
  }, [details])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:3031/products/${id}`, valueToChange)
      Swal.fire("Product updated successfully!")
      window.location.reload() // Reload the page after update
    } catch (error) {
      console.error('Error updating product', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3031/products/${id}`)
      Swal.fire("Product deleted successfully!")
      window.location.reload() // Reload the page after deletion
    } catch (error) {
      console.error('Error deleting product', error)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="relative px-24">
      {/* Product details */}
      <div className="relative z-10 p-14 bg-white shadow-lg rounded-md border border-gray-200 py-6">
        <button className='font-bold text-3xl' onClick={handleBack}>
          ⇦
        </button>
        <h1 className='flex flex justify-center font-bold text-lg'>Product Details</h1>
        <ul className="space-y-4">
          <li>
            <img 
              src={editDetails.image} 
              alt="shoe" 
              className="w-48 h-48 object-cover rounded-md border border-gray-300" 
            />
          </li>
          <li className="text-lg font-medium text-gray-800">
            <span className="text-gray-600">Price:</span> ${editDetails.price}
          </li>
          <li className="text-lg font-medium text-gray-800">
            <span className="text-gray-600">Brand:</span> {editDetails.brand}
          </li>
          <li className="text-lg font-medium text-gray-800">
            <span className="text-gray-600">Discount:</span> {editDetails.discount}
          </li>
          <li className="text-lg font-medium text-gray-800">
            <span className="text-gray-600">Size:</span> {editDetails.sizes}
          </li>
          <li className="text-lg font-medium text-gray-800">
            <span className="text-gray-600">Description:</span> {editDetails.description}
          </li>
          <li className="text-lg font-medium text-gray-800">
            <span className="text-gray-600">Quantity:</span> {editDetails.quantity}
          </li>
          <li className="mt-6">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition ease-in-out duration-200 shadow-sm"
              onClick={() => setClose(true)}
            >
              Edit Product
            </button>
          </li>
        </ul>
      </div>

      {/* Edit form */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-[90%] sm:max-w-md h-auto sm:rounded-lg p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Edit Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Product Brand</label>
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Product Price</label>
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Product Description</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Product Image</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Product Category</label>
                <input
                  type="text"
                  value={newCategorie}
                  onChange={(e) => setNewCategorie(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Product Discount</label>
                <input
                  type="text"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setClose(false)}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditDetails
