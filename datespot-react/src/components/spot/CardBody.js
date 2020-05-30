import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import Like from "./Like";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { addToLikeCount, removeFromLikeCount } from "../../actions/spotActions";

export const CardBody = ({
  title,
  summary,
  spotId,
  likes,
  addToLikeCount,
  removeFromLikeCount,
  auth: { user },
}) => {
  useEffect(() => {
    if (user) {
      setColorOfHeart();
    }
  }, [likes]);

  const [color, setColor] = useState("");

  const setColorOfHeart = () => {
    if (likes.length === 0 || likes === null) {
      setColor("black");
    } else {
      let currentUserLikedSpot = likes.filter(
        (like) => like.userId === user._id
      ).length;
      if (currentUserLikedSpot === 0) {
        setColor("black");
      } else {
        setColor("red");
      }
    }
  };

  const likeCount = () => {
    if (likes.length !== 0) {
      return likes.length;
    } else {
      return 0;
    }
  };

  const setLikeState = () => {
    if (color === "black") {
      addToLikeCount({ spotId: spotId, userId: user._id });
    } else {
      removeFromLikeCount({ spotId: spotId, userId: user._id });
    }
  };

  return (
    <Card.Body data-test="card-container">
      <Card.Title data-test="card-title" className="spotText">
        <span>{title}</span>
      </Card.Title>
      <Card.Text data-test="card-summary" className="spotText">
        <span>{summary}</span>
      </Card.Text>
      <Like
        data-test="like"
        setLikeState={setLikeState}
        likeCount={likeCount}
        color={color}
      />
    </Card.Body>
  );
};

const mapStateToProps = (state) => ({
  spot: state.spot,
  auth: state.auth,
});

CardBody.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  spotId: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  addToLikeCount: PropTypes.func.isRequired,
  removeFromLikeCount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  addToLikeCount,
  removeFromLikeCount,
})(CardBody);
