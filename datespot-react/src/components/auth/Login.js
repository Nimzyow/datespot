import React, { useState, useEffect } from "react";
import { Spinner, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import fireworks from "../../assets/images/fireworks.jpg";

import { connect } from "react-redux";

import { login, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";

const Login = ({
  history,
  login,
  clearErrors,
  setAlert,
  auth: { error, isAuthenticated, spinner },
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/spots");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({ email, password });
    }
  };

  return (
    <div className="container cont" style={{ paddingTop: "30px" }}>
      <Row>
        <Col>
          <img
            src={fireworks}
            style={{ maxWidth: "100%" }}
            className="shadow"
          ></img>
        </Col>
        <Col>
          <Form onSubmit={onSubmit} style={{ flexGrow: "1" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <div className="spotButton">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <p className="text-center">
              Never Signed up? Let's
              <Link to="/register"> Sign you up!</Link>
            </p>
          </Form>
        </Col>
      </Row>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        {spinner && <Spinner animation="border" variant="danger" />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, clearErrors, setAlert })(
  Login
);
