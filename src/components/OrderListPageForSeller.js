import { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { updateAccessToken } from "../util/refreshTokenUtil";

export default function OrderListPageForSeller() {
  let navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  useEffect(() => {
    function fetchOrder() {
      console.log("start to fetch order");
      let accessToken = sessionStorage.getItem("access_token");

      fetch("http://localhost:8080/api/order", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setOrderList(data));
    }
    updateAccessToken(fetchOrder);
  }, []);
  function handleDelete(id) {
    function deleteOrder() {
      let accessToken = sessionStorage.getItem("access_token");

      fetch(`http://localhost:8080/api/order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);

          //navigate("/product")
          setOrderList(orderList.filter((order) => order.id !== id));
        });
    }
    updateAccessToken(deleteOrder);
  }
  return (
    <Container>
      <Button
        size="sm"
        variant="secondary"
        className="my-2"
        onClick={() => setIsDeleteMode(!isDeleteMode)}
      >
        Delete Mode
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            {isDeleteMode ? <td>delete</td> : null}
            <th>id</th>
            <th>userId</th>
            <th>order price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.id}>
              {isDeleteMode ? (
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(order.id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                </td>
              ) : null}
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.priceSum}</td>
              <th>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate(`/seller/editOrder/${order.id}`)}
                >
                  Edit
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
