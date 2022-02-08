import { Button, Card, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style/Product.module.css"

export default function ProductListItem({ product }) {
  let navigate = useNavigate();
  return (
    <Col sm={3}>
      <Card
      className={`${styles.product_card} my-2`}
        onClick={() => {
          navigate(`/product_detail/${product.id}`);
        }}
      >
        <Card.Img variant="top" src="https://via.placeholder.com/728" />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.price}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
}
