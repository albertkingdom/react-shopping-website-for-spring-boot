import { useEffect, useState } from "react"
import { Container, Table, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import ProductListItem from "./ProductListItem"

function ProductPageForCustomer() {
    let navigate = useNavigate()
    const [productList, setProductList] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then(response => response.json())
            .then(data => setProductList(data))
    }, [])

    return (
        <div>
            {productList.map(product =>
                <ProductListItem
                    key={product.id}
                    product={product}
                />
            )}
        </div>
    )
}

export default ProductPageForCustomer