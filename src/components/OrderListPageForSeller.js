import {useState, useEffect} from "react"
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

export default function OrderListPageForSeller() {
    let navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    useEffect(() => {
      fetch("http://localhost:8080/api/order", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => setOrderList(data));
    }, []);
    function handleDelete(id) {
      fetch(`http://localhost:8080/api/order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
  
          //navigate("/product")
          setOrderList(orderList.filter((order) => order.id !== id));
        });
    }
    return (
      <Container>
       
        <Button size="sm" variant="secondary" className="my-2" onClick={() => setIsDeleteMode(!isDeleteMode)}>
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
