import { Button, Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";

export default function ProductListItem({ product }) {
    let navigate = useNavigate()
    return (
        <Card style={{ width: '18rem' }}
            onClick={() => {
                navigate(`/product_detail/${product.id}`)

            }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.price}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}