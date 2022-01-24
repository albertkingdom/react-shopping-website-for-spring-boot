import { useState } from "react"
import { Container, Table, Button, Form, Col, Row, Accordion } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, showLoginError] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:8080/api/login", {
            method: "POST",
            body: JSON.stringify({ "email": email, "password": password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then(resp => {
                console.log("status code", resp.status)
                console.log("status body", resp.body)
                if (resp.status == "200") {
                    navigate("/")
                    localStorage.setItem("user", resp.body)
                } else {
                    showLoginError(true)
                }


                resp.json()
            })
            .then(data => {
                console.log("user data", data)

            })

    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => setEmail(e.target.value)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    {loginError && <Form.Text style={{"color": "red"}}>
                        帳號或密碼錯誤，請重新檢查。
                    </Form.Text>}
                </Form.Group>
                <div className="d-grid">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Login