import { useEffect, useState } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    let navigate = useNavigate()
    let { id } = useParams()
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:8080/api/products/${id}`,{
            method:"PUT",
            body: JSON.stringify({name: productName, price: productPrice}),
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.id != null) {
                navigate("/product_page_seller")
            }
        })
    }
    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setProductName(data.name)
                setProductPrice(data.price)
            })
    }, [id])
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product Id</Form.Label>
                    <Form.Control type="text" disabled value={id}/>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={productName} onChange={(e) => setProductName(e.target.value)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default EditProduct