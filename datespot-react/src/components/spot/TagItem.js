import React from "react";
import { Badge } from "react-bootstrap";

import "./css/TagItem.css";

import { connect } from "react-redux";

import {
  filterSpotsByTags,
  clearFilterSpotsByTags,
} from "../../actions/spotActions";

const TagItem = ({
  tag,
  tagId,
  filterSpotsByTags,
  clearFilterSpotsByTags,
  spot: { filterId },
}) => {
  const onClick = () => {
    if (filterId !== tagId) {
      filterSpotsByTags(tagId, tag);
    } else {
      clearFilterSpotsByTags();
    }
  };

  return (
    <Badge
      variant="light"
      className="tag"
      onClick={onClick}
      style={{
        border: `2px solid ${filterId === tagId ? "red" : "black"}`,
        color: `${filterId === tagId ? "red" : "black"}`,
      }}
    >
      {tag}
    </Badge>
  );
};

const mapStateToProps = (state) => ({
  spot: state.spot,
});

export default connect(mapStateToProps, {
  filterSpotsByTags,
  clearFilterSpotsByTags,
})(TagItem);
