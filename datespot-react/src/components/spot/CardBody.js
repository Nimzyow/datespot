import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import Like from "./Like";

import AuthContext from "../../context/auth/AuthContext";

import { connect } from "react-redux";

import { addToLikeCount, removeFromLikeCount } from "../../actions/spotActions";

const CardBody = ({
  title,
  summary,
  spotId,
  likes,
  addToLikeCount,
  removeFromLikeCount,
}) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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
    <Card.Body>
      <Card.Title data-test="text-container" className="spotText">
        <span>{title}</span>
      </Card.Title>
      <Card.Text data-test="description-container" className="spotText">
        <span>{summary}</span>
      </Card.Text>
      {user && (
        <Like setLikeState={setLikeState} likeCount={likeCount} color={color} />
      )}
    </Card.Body>
  );
};

const mapStateToProps = (state) => ({
  spot: state.spot,
});

export default connect(mapStateToProps, {
  addToLikeCount,
  removeFromLikeCount,
})(CardBody);
