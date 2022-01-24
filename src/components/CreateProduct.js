import { useEffect, useState } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    let navigate = useNavigate()
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:8080/api/products",{
            method:"POST",
            body: JSON.stringify({name: productName, price: productPrice}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
            
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            if (data.id != null) {
                navigate("/product_page_seller")
            }
        })
    }
    useEffect(()=>{
       
    },[])
    return (
        <Container>
            <Form  onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => setProductName(e.target.value)}/>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Price" onChange={(e) => setProductPrice(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default CreateProduct