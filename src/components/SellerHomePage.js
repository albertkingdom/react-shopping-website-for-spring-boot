import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideNav from "./SideNav";
import ProductPageForSeller from "./ProductPageForSeller";
import OrderListPageForSeller from "./OrderListPageForSeller";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import EditOrder from "./EditOrder";
import styles from "../style/App.module.css";
import { Outlet } from "react-router-dom";

export default function SellerHomePage() {
  return (
    <div className={`${styles.main_content} d-flex`}>
      <SideNav />
      <Outlet />
        {/* <Routes>
          <Route
            path="/seller/product_list_page_seller"
            element={<ProductPageForSeller />}
          />
          <Route
            path="/order_list_page_seller"
            element={<OrderListPageForSeller />}
          />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/editOrder/:id" element={<EditOrder />} />
        </Routes> */}
      
    </div>
  );
}
