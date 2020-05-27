import React, { useContext, useEffect } from "react";
import TagContext from "../../context/tag/TagContext";
import TagItem from "./TagItem";
import { Spinner } from "react-bootstrap";

import { connect } from "react-redux";

import { loadUser } from "../../actions/authActions";
import { getTags } from "../../actions/tagActions";

const SpotTags = ({ loadUser, getTags, tag: {tags} }) => {
  useEffect(() => {
    loadUser();
    getTags();
  }, []);

  return (
    <div style={{ fontSize: "17px", textAlign: "center" }}>
      {tags !== null ? (
        tags.map((tag) => (
          <TagItem key={tag._id} tag={tag.tag} tagId={tag._id} />
        ))
      ) : (
        <Spinner animation="border" variant="danger" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tag: state.tag
});

export default connect(mapStateToProps, { loadUser, getTags })(SpotTags);
