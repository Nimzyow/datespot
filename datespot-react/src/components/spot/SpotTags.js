import React, { useEffect } from "react";
import TagItem from "./TagItem";
import { Spinner } from "react-bootstrap";

import { connect } from "react-redux";

import { loadUser } from "../../actions/authActions";
import { getTags } from "../../actions/tagActions";

export const SpotTags = ({ loadUser, getTags, tag: { tags } }) => {
  useEffect(() => {
    loadUser();
    getTags();
  }, []);

  return (
    <div
      data-test="spot-tags-container"
      style={{ fontSize: "17px", textAlign: "center" }}
    >
      {tags !== null ? (
        tags.map((tag) => (
          <TagItem
            data-test="tag-item-container"
            key={tag._id}
            tag={tag.tag}
            tagId={tag._id}
          />
        ))
      ) : (
        <Spinner data-test="spinner" animation="border" variant="danger" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps, { loadUser, getTags })(SpotTags);
