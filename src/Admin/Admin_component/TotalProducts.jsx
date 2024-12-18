import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Components/ProductContext";
import { useNavigate, useLocation } from "react-router-dom";

const TotalProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext); // Ensure setProducts is available in context
  const [allProducts, setAllProducts] = useState([]);

  // Log to debug the products state
  console.log("Products from context:", products);

  useEffect(() => {
    if (products) {
      setAllProducts(products);
    }
  }, [products, location]); // Ensure this runs when products or location change

  const handleCategorie = (category) => {
    if (category === "All") {
      setAllProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.categories === category
      );
      setAllProducts(filteredProducts);
    }
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleAddProducts = () => {
    navigate("/dashboard/totalProducts/addProduct");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Total Products</h1>

      {/* Categories */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition"
            onClick={() => handleCategorie("All")}
          >
            All
          </button>
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition"
            onClick={() => handleCategorie("Men")}
          >
            Men
          </button>
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition"
            onClick={() => handleCategorie("Women")}
          >
            Women
          </button>
        </div>

        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          onClick={handleAddProducts}
        >
          Add Products
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-gray-700 font-semibold w-1/5">
                Image
              </th>
              <th className="px-6 py-3 text-gray-700 font-semibold w-1/4">
                Brand
              </th>
              <th className="px-6 py-3 text-gray-700 font-semibold w-1/4">
                Price
              </th>
              <th className="px-6 py-3 text-gray-700 font-semibold w-1/4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts.length > 0 ? (
              allProducts.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <img
                        src={item.image}
                        alt="shoe"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-800">{item.brand}</td>
                  <td className="px-6 py-4 text-gray-800">${item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        onClick={() => handleEdit(item.id)}
                      >
                        View For Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalProducts;
