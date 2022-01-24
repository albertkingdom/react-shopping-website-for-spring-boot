import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5";

import ProductPageForSeller from './components/ProductPageForSeller';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductPageForCustomer from './components/ProductPageForCustomer';
import ProductDetailPageForCustomer from './components/ProductDetailPageForCustomer';
import Cart from "./components/Cart"
import CheckOut from './components/CheckOut';
import Login from './components/Login';
import { useState } from 'react';


function App() {
  const [userInfo, setUserInfo] = useState("")
  function configuretUserInfo(value) {
    setUserInfo(value)
  }
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Nav.Link>
          <Link to="/product_page_seller">後台</Link>

        </Nav.Link>
        <Nav.Link >

          <Link to="/product_list">前台</Link>

        </Nav.Link>
        <Nav.Link>

          <Link to="/cart" className="mx-2" ><IoCartOutline size={24} /></Link>
          <Link to="/login" className="mx-2"><IoPersonCircleOutline size={24} /></Link>

        </Nav.Link>


      </Navbar>
      <Routes>
        <Route path="/product_page_seller" element={<ProductPageForSeller />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/product_list" element={<ProductPageForCustomer />} />
        <Route path="/product_detail/:id" element={<ProductDetailPageForCustomer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login prop={userInfo} setUser={configuretUserInfo} />} />

      </Routes>


    </Router>
  );
}

export default App;
