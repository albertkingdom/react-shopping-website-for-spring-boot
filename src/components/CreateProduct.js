import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateAccessToken } from "../util/refreshTokenUtil";

function CreateProduct() {
  let navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit", e.target);
    console.log(
      "handle submit",
      e.target.productName.value,
      e.target.productPrice.value,
      e.target.image.files[0]
    );

    function createProduct(data) {
      let accessToken = sessionStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("productName", e.target.productName.value);
      formData.append("productPrice", e.target.productPrice.value);
      formData.append("productImage", e.target.image.files[0]);

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        method: "POST",
        // body: JSON.stringify({ name: productName, price: productPrice }),
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.id != null) {
            navigate("/seller/product_list_page_seller");
          }
        });
    }
    updateAccessToken(createProduct);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="productName"
            placeholder="Enter name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="productPrice"
            placeholder="Price"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control name="image" type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreateProduct;
