import { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductListItem from "./ProductListItem";

function ProductPageForCustomer() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
        setIsLoading(false);
      });
  }, []);
  
  if (isLoading) {
    return (
      <div className="p-5 d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }
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
