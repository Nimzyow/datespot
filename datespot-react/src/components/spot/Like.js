import React from "react";
import "./css/SpotItem.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Like = ({ likeCount, setLikeState, color }) => {
  return (
    <div data-test="like-container" className="spotText">
      <span>
        <FontAwesomeIcon
          data-test="icon-container"
          icon={faHeart}
          style={{ color: `${color}`, cursor: "pointer" }}
          onClick={setLikeState}
        />{" "}
        {likeCount()}
      </span>
    </div>
  );
};

Like.propTypes = {
  likeCount: PropTypes.func.isRequired,
  setLikeState: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default Like;
