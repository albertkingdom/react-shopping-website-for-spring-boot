import { useEffect, useState } from "react";
import { Container, Table, Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductListItem from "./ProductListItem";

function ProductPageForCustomer() {
  
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {productList.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ProductPageForCustomer;
