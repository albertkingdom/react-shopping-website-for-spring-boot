import { Link } from "react-router-dom";
import styles from "../style/App.module.css";

export default function SideNav() {
    return (
        <div className={`col-3 ${styles.side_nav}`}>
          <ul>
            <li><Link to="/seller/product_list_page_seller">商品管理</Link></li>
            <li><Link to="/seller/order_list_page_seller">訂單管理</Link></li>

          </ul>
        </div>
    )
}