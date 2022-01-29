import logo from "./logo.svg";
import styles from "./style/App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5";

import Header from "./components/Header";
import ProductPageForSeller from "./components/ProductPageForSeller";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import EditOrder from "./components/EditOrder";
import ProductPageForCustomer from "./components/ProductPageForCustomer";
import OrderListPageForSeller from "./components/OrderListPageForSeller";
import ProductDetailPageForCustomer from "./components/ProductDetailPageForCustomer";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Login from "./components/Login";
import SellerHomePage from "./components/SellerHomePage";

import { useState } from "react";
import RouteNeedLogin from "./components/RouteNeedLogin";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  function configuretUserInfo(value) {
    setUserInfo(value);
  }
  function configureCart(value) {
    setCartCount(value);
  }
  return (
    <Router>
      <Header userInfo={userInfo} cartCount={cartCount} />

      <Routes>
        <Route
          path="/seller"
          element={
            <RouteNeedLogin redirectTo="/login" userName={userInfo}>
              <SellerHomePage />
            </RouteNeedLogin>
          }
        >
          <Route
            path="product_list_page_seller"
            element={<ProductPageForSeller />}
          />
          <Route
            path="order_list_page_seller"
            element={<OrderListPageForSeller />}
          />
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="editProduct/:id" element={<EditProduct />} />
          <Route path="editOrder/:id" element={<EditOrder />} />
        </Route>

        <Route path="/product_list" element={<ProductPageForCustomer />} />
        <Route
          path="/product_detail/:id"
          element={<ProductDetailPageForCustomer setCart={configureCart} />}
        />
        <Route path="/cart" element={<Cart setCart={configureCart} />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route
          path="/login"
          element={<Login userName={userInfo} setUser={configuretUserInfo} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
