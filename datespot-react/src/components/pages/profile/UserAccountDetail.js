import React from "react";
import { Card } from "react-bootstrap";

const UserAccountDetail = ({ user }) => {
  return (
    <div
      data-test="uad-container"
      style={{ flexGrow: "1", width: "50%", margin: "5px" }}
    >
      <Card>
        <Card.Header
          data-test="header-element"
          style={{ backgroundColor: "floralwhite" }}
        >
          Your Account
        </Card.Header>
        <Card.Body>
          <Card.Title>Email</Card.Title>
          <Card.Text data-test="email-element">{user.email}</Card.Text>
          <Card.Title>Username</Card.Title>
          <Card.Text data-test="username-element">{user.username}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserAccountDetail;
