import React, { useState, useEffect } from "react";
import { Spinner, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import fireworks from "../../assets/images/fireworks.jpg";

import { connect } from "react-redux";

import { login, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";

export const Login = ({
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

  const onSubmit = () => {
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({ email, password });
    }
  };

  return (
    <div
      data-test="login-container"
      className="container cont"
      style={{ paddingTop: "30px" }}
    >
      <Row>
        <Col>
          <img
            data-test="image-element"
            src={fireworks}
            style={{ maxWidth: "100%" }}
            className="shadow"
          ></img>
        </Col>
        <Col>
          <Form style={{ flexGrow: "1" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                data-test="email-input"
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
                data-test="password-input"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <div className="spotButton">
              <Button
                data-test="submit-button"
                variant="primary"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
            <p data-test="sign-up-mess" className="text-center">
              Never Signed up? Let's
              <Link to="/register"> Sign you up!</Link>
            </p>
          </Form>
        </Col>
      </Row>

      <div
        data-test="spinner-element"
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
