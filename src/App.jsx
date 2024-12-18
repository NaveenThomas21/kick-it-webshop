import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Navbar from './pages/Navbar';
import Home from './Components/home';
import About from './Components/About';
import Products from './Components/Products';
import Contact from './Components/Contact';
import ProductProvider from './Components/ProductContext';
import ProductDetails from './Components/productDetails';
import AddToCart from './Components/AddToCart';
import PaymentSection from './payment/paymentSection';
import Order from './payment/Order';
import Dashbord from './Admin/Admin_component/Dashbord';
import TotalProducts from './Admin/Admin_component/TotalProducts';
import Users from './Admin/Admin_component/users';
import EditDetails from './Admin/Admin_component/EditDetails';
import AddProduct from './Admin/Admin_component/AddProduct';
import UserDetails from './Admin/Admin_component/UserDetails';

function App() {
  const location = useLocation();


  const hideNavPaths = ['/SignIn', '/SignUp', '/dashboard'];


  const shouldHideNavbar = hideNavPaths.some((path) => location.pathname.toLowerCase().startsWith(path.toLowerCase()));

  return (
    <>
      <ProductProvider>

        {!shouldHideNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/About" element={<About />} />
          <Route path="/Product" element={<Products />} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/addToCart" element={<AddToCart />} />
          <Route path="/payment" element={<PaymentSection />} />
          <Route path="/orderDetails" element={<Order />} />


          <Route path="/dashboard" element={<Dashbord />}>
            <Route path="totalProducts" element={<TotalProducts />} />
            <Route path="users" element={<Users />} />
            <Route path="totalproducts/edit/:id" element={<EditDetails />} />
            <Route path='totalProducts/addProduct' element={<AddProduct/>}></Route>
            <Route path='users/userDetails/:id' element={<UserDetails/>}></Route>

          </Route>


        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
