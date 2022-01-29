import { Navbar, Container, Badge, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5";
import styles from "../style/Header.module.css"

export default function Header({ userInfo, cartCount }) {
  return (
    <nav className={`py-1 ${styles.topHeader}`}>
      <Container className="d-flex align-items-center">
        <Navbar.Brand>Brand link</Navbar.Brand>
        <div className="d-flex justify-content-between  flex-grow-1">
          <div className="">
            <Link
              to="/seller"
              className="text-decoration-none text-dark mx-2"
            >
              後台
            </Link>

            <Link
              to="/product_list"
              className="text-decoration-none text-dark mx-2"
            >
              商品頁
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <Link to="/cart" className="mx-2">
              <IoCartOutline size={24} />
            </Link>
            <Badge pill bg="secondary" className="me-1">
              {cartCount}
            </Badge>
            {userInfo && <p className="my-0">Hello, {userInfo}</p>}
            <Link to="/login" className="mx-2">
              <IoPersonCircleOutline size={24} />
            </Link>
          </div>
         
        </div>
      </Container>
    </nav>
  );
}
