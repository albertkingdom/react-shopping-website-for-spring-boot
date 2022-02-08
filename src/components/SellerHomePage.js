import SideNav from "./SideNav";
import styles from "../style/App.module.css";
import { Outlet } from "react-router-dom";

export default function SellerHomePage() {
  return (
    <div className={`${styles.main_content} d-flex`}>
      <SideNav />
      <Outlet />
    </div>
  );
}
