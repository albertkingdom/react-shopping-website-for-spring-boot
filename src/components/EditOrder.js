import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditOrder() {
  let navigate = useNavigate();
  let { id } = useParams();
  
  const [userId, setUserId] = useState();

  const [orderPrice, setOrderPrice] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8080/api/order/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
        }

    })
    .then(response => {
        if(response.status===200){
            navigate("/seller/order_list_page_seller")
        } else {
            throw new Error("delete order failer")
        }
    })
    .catch(error => console.log(error))
    
  }
  useEffect(() => {
    fetch(`http://localhost:8080/api/order/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setUserId(data.userId);
        setOrderPrice(data.priceSum);
        setOrderItems(data.orderItems);
      });
  }, [id]);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Order Id</Form.Label>
          <Form.Control type="text" readOnly value={id} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>User Id</Form.Label>
          <Form.Control type="text" value={userId} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={orderPrice} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Items</Form.Label>
          {/* <Form.Control as="textarea"  disabled /> */}
          {orderItems.map((item) => (
            <p key={item.productId}>商品id: {item.productId}, 商品數量: {item.quantity}</p>
         

          ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Delete
        </Button>
      </Form>
    </Container>
  );
}

export default EditOrder;
