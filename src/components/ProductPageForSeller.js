import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

function ProductPageForSeller() {
  let navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/api/products", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);
  function handleDelete(id) {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);

        //navigate("/product")
        setProductList(productList.filter((product) => product.id !== id));
      });
  }
  return (
    <Container>
      <div className="">
        <Button
          role="link"
          size="sm"
          variant="secondary"
          className="m-2"
          onClick={() => navigate("/seller/createProduct")}
        >
          Create
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsDeleteMode(!isDeleteMode)}
        >
          Delete Mode
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            {isDeleteMode ? <th>Delete</th> : null}
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              {isDeleteMode ? (
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(product.id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                </td>
              ) : null}
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <th>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate(`/seller/editProduct/${product.id}`)}
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

export default ProductPageForSeller;
