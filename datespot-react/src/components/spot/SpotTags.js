import React, { useContext, useEffect } from "react";
import TagContext from "../../context/tag/TagContext";
import TagItem from "./TagItem";
import { Spinner } from "react-bootstrap";

import { connect } from "react-redux";

import { loadUser } from "../../actions/authActions";

const SpotTags = ({ loadUser }) => {
  const tagContext = useContext(TagContext);
  const { getTags, tags } = tagContext;
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { loadUser })(SpotTags);
