import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./NavigationBar.css";

import { connect } from "react-redux";

import { logOut } from "../../../actions/authActions";

export const NavigationBar = ({ auth: { user }, logOut }) => {
  return (
    <div>
      <Navbar
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "#E44236" }}
        className="shadow"
      >
        <Navbar.Brand>
          {user ? (
            <Link to="/spots" className="link">
              DateSpot
            </Link>
          ) : (
            <Link to="/" className="link">
              DateSpot
            </Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/about" className="link">
                About
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto" style={{ color: "white" }}>
            {user ? `Hello ${user.username} :)` : ""}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    to="/profile"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/login" className="link" style={{ color: "black" }}>
                    Login
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    to="/register"
                    className="link"
                    style={{ color: "black" }}
                  >
                    Register
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NavigationBar);
