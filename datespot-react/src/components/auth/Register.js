import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import champagne from "../../assets/images/champagne.jpg";

import { connect } from "react-redux";

import { register, clearErrors } from "../../actions/authActions";

import { setAlert } from "../../actions/alertActions";

const Register = ({
  history,
  register,
  clearErrors,
  setAlert,
  auth: { error, isAuthenticated },
}) => {

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/spots");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        username,
        email,
        password,
      });
    }
  };

  return (
    <div className="container cont" style={{ paddingTop: "30px" }}>
      <Row>
        <Col>
          <img
            src={champagne}
            className="shadow"
            style={{ maxWidth: "100%" }}
          ></img>
        </Col>
        <Col>
          <Form onSubmit={onSubmit} style={{ flexGrow: "1" }}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </Form.Group>
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
                minLength="6"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
                minLength="6"
                required
              />
            </Form.Group>
            <div className="spotButton">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <p className="text-center">
              Already Signed up? Go for a cheeky{" "}
              <Link to="/login">Sign in!</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert
});

export default connect(mapStateToProps, { register, clearErrors, setAlert })(Register);
