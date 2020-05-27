import React, { useState, useContext, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../../context/auth/AuthContext";

import { connect } from "react-redux";

import { postComment } from "../../../actions/spotActions";

const Comment = ({ spotId, postComment }) => {
  const [text, setText] = useState("");
  const [postError, setPostError] = useState(false);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      let data = {
        comment: text,
        userId: user.id,
        spotId: spotId,
      };
      postComment(data);
      setPostError(false);
      setText("");
    } else {
      setPostError(true);
    }
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows="6"
            value={text}
            onChange={onChange}
          />
        </Form.Group>
        <div className="spotButton">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      {postError && (
        <div style={{ marginTop: "10px" }}>
          <h5>Please enter a comment before posting</h5>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { postComment })(Comment);
