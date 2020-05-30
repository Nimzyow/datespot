import React, { useState, useContext, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";

import { postComment } from "../../../actions/spotActions";

export const Comment = ({ spotId, postComment, auth: { user } }) => {
  const [text, setText] = useState("");
  const [postError, setPostError] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      let data = {
        comment: text,
        userId: user._id,
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
      <Form data-test="form-container" onSubmit={onSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label data-test="label-element">Comment</Form.Label>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { postComment })(Comment);
