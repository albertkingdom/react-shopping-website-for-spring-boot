import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

function ProductDetailPageForCustomer() {
    let { id } = useParams()
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setProductName(data.name)
                setProductPrice(data.price)
            })
    }, [id])

    function handleAddToCart(productId, productCount) {
        let existing = localStorage.getItem("shopping_cart") //[ {id:1, count:3},{...}]
        let existingArray = JSON.parse(existing)
        console.log("existing array length", existingArray)
        if (existing != null && existingArray.length > 0) {
            let existingArray = JSON.parse(existing)
            let newArray = existingArray.map(item => item.id == productId ? { id: item.id, count: item.count += productCount } : item)
            localStorage.setItem("shopping_cart", JSON.stringify(newArray))
        } else {
            let newArray = [{ id: productId, count: productCount }]
            localStorage.setItem("shopping_cart", JSON.stringify(newArray))
        }
    }
    return (

        <Container>
            <Row>
                <Col sm={6}>
                    <img src="#" alt="product image" />
                </Col>
                <Col sm={6}>
                    <h3>{productName}</h3>
                    <h4>${productPrice}</h4>
                    <Button variant="outline-danger" onClick={() => handleAddToCart(id, 1)}>加入購物車</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default ProductDetailPageForCustomer