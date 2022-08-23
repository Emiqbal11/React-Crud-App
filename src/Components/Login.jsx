import React, { useState } from "react";
import { Button, Container, Col, Form, Alert } from "react-bootstrap";
import InputField from "./Common/InputField";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useUserAuth } from "./Context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, SetPassword] = useState();
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/main");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div style={{ paddingTop: "100px" }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <br />
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              lineHeight: "20px",
            }}
          >
            <Col sm={4}>
              <InputField
                label={"Email"}
                type={"email"}
                value={email}
                setValue={setEmail}
              />
              <br />
              <InputField
                label={"Password"}
                type={"password"}
                value={password}
                setValue={SetPassword}
              />
              <br />
              
              <div
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
                  varient="primary"
                  className="login"
                >
                  Login
                </Button>
              </div>
              <br />
              <div style={{textAlign:'center',fontSize:'18px',fontWeight:'600'}}><hr/>
                Don't have an a ccount <Link to="/signup" style={{color:'#09b0e3',textDecoration:'none'}}>Signup</Link>
              </div>
            </Col>
            <br />
          </Container>
        </Form>
      </div>
    </>
  );
};

export default Login;


























