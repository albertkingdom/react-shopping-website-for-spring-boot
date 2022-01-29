import { useState, useEffect } from "react";
import {
  Container,
   Button,
  Form,
    ButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ userName, setUser }) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loginError, showLoginError] = useState(false);
  const [loginForm, setLoginForm] = useState(true);

  function handleLogIn(e) {
    let formIsValid = validateForm()
    //if (!formIsValid) { return }
    e.preventDefault();
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((resp) => {
        console.log("status code", resp.status);
        //console.log("status body", resp.body)
        if (resp.status === 200) {
          // localStorage.setItem("user", resp.body)

          return resp.json();
        } else {
          showLoginError(true);
          throw new Error("failed to login");
        }
      })
      .then((data) => {
        console.log("user data", data);
        setUser(data.name);
        localStorage.setItem("shopping-website-user", data.name);
        navigate("/product_list");
      })
      .catch((error) => console.log(error));
  }
  function handleRegister(e) {
    e.preventDefault();
    fetch("http://localhost:8080/api/register", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((resp) => {
        console.log("status code", resp.status);
        //console.log("status body", resp.body)
        if (resp.status === 200) {
          // localStorage.setItem("user", resp.body)

          return resp.json();
        } else {
          throw new Error("failed to register");
        }
      })
      .then((data) => {
        console.log("register result", data);
      })
      .catch((error) => console.log(error));
  }
  function handleLogout() {
    fetch("http://localhost:8080/api/logout")
      .then((resp) => resp.text())
      .then((data) => console.log(data));
    setUser(null);
    localStorage.removeItem("shopping-website-user");
  }
  function validateForm() {
      if (email.length === 0 || password.length === 0){
          console.log("email 長度不足")
          return 
      }
  }
  

  if (userName != null) {
    return (
      <Container>
        <h1>Hello, you have logged in as {userName}</h1>
        <Button className="" onClick={handleLogout}>
          Log out
        </Button>
      </Container>
    );
  }

  return (
    <Container className="">
      <ButtonGroup className="">
        <Button
          variant={loginForm ? "primary" : "outline-secondary"}
          onClick={() => setLoginForm(true)}
        >
          登入
        </Button>
        <Button
          variant={!loginForm ? "primary" : "outline-secondary"}
          onClick={() => setLoginForm(false)}
        >
          註冊
        </Button>
      </ButtonGroup>
      <Form onSubmit={loginForm ? handleLogIn : handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <Form.Text style={{ color: "red" }}>
              帳號或密碼錯誤，請重新檢查。
            </Form.Text>
          )}
        </Form.Group>
        {!loginForm && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        )}
        {loginForm && (
          <div className="d-grid">
            <Button variant="primary" type="submit" >
              登入
            </Button>
          </div>
        )}
        {!loginForm && (
          <div className="d-grid">
            <Button variant="primary" type="submit" >
              註冊
            </Button>
          </div>
        )}
      </Form>
    </Container>
  );
}

export default Login;
