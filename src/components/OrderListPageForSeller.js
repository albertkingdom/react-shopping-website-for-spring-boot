import { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { updateAccessToken } from "../util/refreshTokenUtil";

export default function OrderListPageForSeller() {
  let navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  // const [isDeleteMode, setIsDeleteMode] = useState(false);
  useEffect(() => {
    function fetchOrder() {
      console.log("start to fetch order");
      let accessToken = sessionStorage.getItem("access_token");

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order`, {
        // credentials: "include",
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

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/${id}`, {
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
  function formatDate(dateStr) {
    let dateObj = new Date(dateStr)
    let year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    let date = dateObj.getDate()
    let hourStr = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : `${dateObj.getHours()}`
    let minStr = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : `${dateObj.getMinutes()}`
    let secStr = dateObj.getSeconds() < 10 ? `0${dateObj.getSeconds()}` : `${dateObj.getSeconds()}`
    return `${year}-${month}-${date} ${hourStr}:${minStr}:${secStr}`
  }
  return (
    <Container>
      {/* <Button
        size="sm"
        variant="secondary"
        className="my-2"
        onClick={() => setIsDeleteMode(!isDeleteMode)}
      >
        Delete Mode
      </Button> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            {/* {isDeleteMode ? <td>delete</td> : null} */}
            <th>id</th>
            <th>userId</th>
            <th>order price</th>
            <th>訂單成立時間</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.id}>
              {/* {isDeleteMode ? (
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(order.id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                </td>
              ) : null} */}
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.priceSum}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate(`/seller/editOrder/${order.id}`)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(order.id)}
                >
                  <MdDeleteOutline />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
